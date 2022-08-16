import axios from 'axios';
import { API_FEEDBACK_DOMAINS, API_LANGUAGE_DOMAINS, API_ENVS, API_SPORTS_DOMAINS } from './config';
import qs from 'qs';
import { Message } from 'antd';
console.log(API_ENVS, 'API_ENVS', API_ENVS.prod);

class APIRequest {
  constructor(config) {
    const {
      env = API_ENVS.prod,
      appName = '',
      useHttps = true,
      isLog = false,
      requestMethod = axios,
      requestFilter = (req) => req,
      responseFilter = (res) => res,
    } = config;

    let { domains = {} } = config;
    console.error(domains);

    const protocoReplace = useHttps
      ? { from: /(http|https):\/\//i, to: 'https://' }
      : { from: /(http|https):\/\//, to: 'http://' };

    const keys = Object.getOwnPropertySymbols(domains);
    domains = keys.reduce((acc, key) => {
      let domain = domains[key];
      domain = domain.replace(protocoReplace.from, '');
      domain = `${protocoReplace.to}${domain}`;

      acc[key] = domain;
      return acc;
    }, {});

    console.log(domains);

    isLog && console.warn('API 请求日志输出开启');

    this.config = { env, domains, appName, isLog, useHttps };

    this.requestFilter = requestFilter;
    this.responseFilter = responseFilter;
    this.requestMethod = requestMethod;

    this.onRejectMessage = () => {};
  }
  getRequestUrl(apiPath, apiVersion) {
    if (!apiPath) {
      throw new Error('请求的接口名称不正确');
    }

    const { env, domains, appName } = this.config;
    const domain = domains[env];

    const _apiPath = apiPath.replace(/\./g, '/');

    return `${[domain, appName, apiVersion ? 'v' + apiVersion : apiVersion, _apiPath]
      .filter((e) => e)
      .join('/')}`;
  }
  request(apiPath, apiVersion = '1', data = {}, options = {}, method = 'POST') {
    const { dataType = 'json', timeout, errorSilent = false } = options;
    let url = this.getRequestUrl(apiPath, apiVersion);
    if (method === 'GET') {
      console.log(data);
      url += '?' + qs.stringify({ ...data, _time: new Date().getTime() });
    }
    let requestOptions = Object.assign(
      {},
      {
        method,
        url,
        dataType,
        withCredentials: false,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          'x-zone': -new Date().getTimezoneOffset() / 60,
          authorization: localStorage.getItem('token'),
        },
      },
      Object.keys(data).length || data instanceof FormData ? { data } : {},
    );

    if (typeof this.requestFilter === 'function') {
      requestOptions = this.requestFilter(requestOptions);
    }

    // console.log(requestOptions);

    const logFilter = this.config.isLog
      ? (url, requestOptions) =>
          (log = console.log, response) => {
            try {
              console.log(Object.keys(response.request));

              console.log(response.request._headerSent);
              console.log(response.request._header);

              console.group(`API Log For: ${url}`);
              log('API Request:', JSON.stringify(requestOptions));
              log('API Response:', {
                status: response.status,
                data: JSON.stringify(response.data),
              });
              console.groupEnd();
            } catch (e) {
              console.log('当前不支持 API 请求日志输出，请将 isLog 置为 false');
            }
          }
      : () => () => {};

    return this.requestMethod(requestOptions)
      .then((res) => {
        logFilter(url, requestOptions)(console.log, res);
        return Promise.resolve(res);
      })
      .catch((e) => {
        logFilter(url, requestOptions)(console.error, e);

        const errRes = {
          data: {
            succeed: false,
            err: {
              code: '-10001',
              message: `请求异常`,
            },
          },
        };

        const { data = {} } = errRes;
        const { code, message } = data.err;

        // 统一错误提示
        this.onRejectMessage({ code, message, errorSilent });

        return Promise.reject(e);
      })
      .then(this.responseFilter)
      .then((res) => this.APIDefaultFilter(res, errorSilent));
  }
  post(apiPath, apiVersion = '1', data = {}, options = {}) {
    return this.request(apiPath, apiVersion, data, options, 'POST');
  }
  get(apiPath, apiVersion = '1', data = {}, options = {}) {
    return this.request(apiPath, apiVersion, data, options, 'GET');
  }
  delete(apiPath, apiVersion = '1', data = {}, options = {}) {
    return this.request(apiPath, apiVersion, data, options, 'DELETE');
  }
  setEnv(env) {
    this.config.env = env;

    if (!Object.values(API_ENVS).includes(env)) {
      throw new Error('API.setEnv() 指定的参数不是预置项，请确保是因为用于开发调试');
    }
  }

  APIDefaultFilter = (res, errorSilent = false) => {
    const { status: statusCode } = res;
    // debugger;
    let ret;

    if (statusCode !== 200) {
      ret = Promise.reject({
        data: {
          code: 10000,
          message: `请求异常，http code: ${statusCode}`,
        },
      });
    } else {
      ret = res.data.code !== 0 ? Promise.reject(res) : Promise.resolve(res);
    }

    // 统一处理 error 的情况，插入外部传入的 message 提示
    ret = ret.catch((res) => {
      const { data = {} } = res;
      const { code, message } = res.data;

      this.onRejectMessage({ code, message, errorSilent });
      return Promise.reject(res);
    });

    return ret;
  };

  setCustomMessageForReject(handler = () => {}) {
    this.onRejectMessage = handler;
  }
}

function APIFilter(res) {
  const { code, data, message } = res.data;
  if (code !== 0) {
    Message.error(message);
    return Promise.reject({ code, message });
  } else {
    return Promise.resolve(data);
  }

  return ret;
}

export {
  APIRequest,
  API_ENVS,
  API_FEEDBACK_DOMAINS,
  API_SPORTS_DOMAINS,
  API_LANGUAGE_DOMAINS,
  APIFilter,
};

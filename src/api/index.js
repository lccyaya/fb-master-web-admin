import {
  APIRequest,
  APIFilter,
  API_ENVS,
  API_FEEDBACK_DOMAINS,
  API_LANGUAGE_DOMAINS,
  API_SPORTS_DOMAINS,
} from './api';
import { Message } from 'antd';
import { history } from 'umi';

console.log('环境变量', process.env.NODE_ENV, REACT_APP_ENV);

const API = new APIRequest({
  env: API_ENVS[REACT_APP_ENV],
  appName: 'api/admin',
  useHttps: window.location.protocol.indexOf('https') > -1,
  // useHttps: false
});

const handleErrorCode = (code, msg, errorSilent) => {
  console.log(111111, code, msg, errorSilent);
  // 10001 表示登出
  if (code === 401 || code === 10010) {
    if (!errorSilent) {
      Message.error(msg);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    history.push('/user/login');
  } else if (code === 40003) {
    if (!errorSilent) {
      Message.error('用户暂无权限');
    }

    history.replace('/403');
  } else {
    if (!errorSilent) {
      Message.error(msg);
    }
  }
};

const API_FEEDBACK = new APIRequest({
  domains: API_FEEDBACK_DOMAINS,
  env: API_ENVS[REACT_APP_ENV],
  appName: 'api/admin',
  useHttps: window.location.protocol.indexOf('https') > -1,
});

const API_LANGUAGE = new APIRequest({
  domains: API_LANGUAGE_DOMAINS,
  env: API_ENVS[REACT_APP_ENV],
  appName: 'api/admin',
  useHttps: window.location.protocol.indexOf('https') > -1,
});

const API_SPORT = new APIRequest({
  domains: API_SPORTS_DOMAINS,
  env: API_ENVS[REACT_APP_ENV],
  appName: 'api',
  useHttps: window.location.protocol.indexOf('https') > -1,
});

API.setCustomMessageForReject(({ code, message, errorSilent }) => {
  handleErrorCode(code, message, errorSilent);
});
API_FEEDBACK.setCustomMessageForReject(({ code, message, errorSilent }) => {
  handleErrorCode(code, message, errorSilent);
});
API_LANGUAGE.setCustomMessageForReject(({ code, message, errorSilent }) => {
  handleErrorCode(code, message, errorSilent);
});

API_SPORT.setCustomMessageForReject(({ code, message, errorSilent }) => {
  handleErrorCode(code, message, errorSilent);
});

export default API;
export { APIFilter, API_ENVS, API_FEEDBACK, API_LANGUAGE, API_SPORT };

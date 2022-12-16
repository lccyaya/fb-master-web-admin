const API_ENVS = {
  prod: Symbol('prod'),
  test: Symbol('test'),
  dev: Symbol('dev'),
  local: Symbol('local'),
};

const API_FEEDBACK_DOMAINS = {
  [API_ENVS.prod]: 'http://47.94.89.58:7007',
  [API_ENVS.test]: 'http://47.94.89.58:7007',
  [API_ENVS.dev]: 'http://47.94.89.58:7007',
  [API_ENVS.local]: 'http://47.94.89.58:7007',
};

const API_LANGUAGE_DOMAINS = {
  [API_ENVS.prod]: '//language.34.com',
  [API_ENVS.test]: '//language.34.com',
  [API_ENVS.dev]: '//language.34.com',
  [API_ENVS.local]: '//language.34.com',
};

// const API_SPORTS_DOMAINS = {
//   [API_ENVS.prod]: 'http://10.149.54.90:8080',
//   [API_ENVS.test]: 'http://10.149.54.90:8080',
//   [API_ENVS.dev]: 'http://10.149.54.90:8080',
//   [API_ENVS.local]: 'http://10.149.54.90:8080',
// };



// 本地
// const API_SPORTS_DOMAINS = {
//   [API_ENVS.prod]: '192.168.110.82:8080',
//   [API_ENVS.test]: '192.168.110.82:8080',
//   [API_ENVS.dev]: '192.168.110.82:8080',
//   [API_ENVS.local]: '192.168.110.82:8080',
// };


// 正式环境
const API_SPORTS_DOMAINS = {
  [API_ENVS.prod]: 'http://47.94.89.58:8081',
  [API_ENVS.test]: 'http://47.94.89.58:8081',
  [API_ENVS.dev]: 'http://47.94.89.58:8081',
  [API_ENVS.local]: 'http://47.94.89.58:8081',
};

// const API_SPORTS_DOMAINS = {
//   [API_ENVS.prod]: '//admin-api.34.com',
//   [API_ENVS.test]: '//admin-api.34.com',
//   [API_ENVS.dev]: '//admin-api.34.com',
//   [API_ENVS.local]: '//admin-api.34.com',
// };

export { API_ENVS, API_FEEDBACK_DOMAINS, API_LANGUAGE_DOMAINS, API_SPORTS_DOMAINS };

const API_ENVS = {
  prod: Symbol('prod'),
  test: Symbol('test'),
  dev: Symbol('dev'),
  local: Symbol('local'),
};

const API_FEEDBACK_DOMAINS = {
  [API_ENVS.prod]: '//feedback.34.com',
  [API_ENVS.test]: '//feedback.34.com',
  [API_ENVS.dev]: '//feedback.34.com',
  [API_ENVS.local]: '//feedback.34.com',
};

const API_LANGUAGE_DOMAINS = {
  [API_ENVS.prod]: '//language.34.com',
  [API_ENVS.test]: '//language.34.com',
  [API_ENVS.dev]: '//language.34.com',
  [API_ENVS.local]: '//language.34.com',
};

const API_SPORTS_DOMAINS = {
  [API_ENVS.prod]: '//admin-api.34.com',
  [API_ENVS.test]: '//admin-api.34.com',
  [API_ENVS.dev]: '//admin-api.34.com',
  [API_ENVS.local]: '//admin-api.34.com',
};

export { API_ENVS, API_FEEDBACK_DOMAINS, API_LANGUAGE_DOMAINS, API_SPORTS_DOMAINS };

export default {
  namespace: 'global',
  state: {
    projectId: '',
    projectName: '',
    languages: [],
    platforms: [],
  },
  effects: {
    *setProjectAndLanguage({ payload }, { put }) {
      const { projectId, languages, projectName } = payload;
      yield put({
        type: 'save',
        payload: {
          projectId,
          projectName,
          languages,
        },
      });
    },
    *setPlatforms({ payload }, { put }) {
      const { platforms } = payload;
      yield put({
        type: 'save',
        payload: {
          platforms,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

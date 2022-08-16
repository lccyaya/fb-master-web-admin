/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentProject, authList = [] } = initialState || {};
  // console.log(currentProject, authList, 9999);
  return {
    normalRouteFilter: (route) => true,
    // authList.find((item) => item.key === route.key && item.project_id === currentProject * 1),
  };
}

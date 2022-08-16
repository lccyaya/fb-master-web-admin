import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel, history } from 'umi';

const Home = ({ routes }) => {
  const { initialState } = useModel('@@initialState');
  useEffect(() => {
    const { authList, currentProject } = initialState;
    const keys = authList
      .filter((item) => item.project_id === currentProject)
      .map((item) => item.key);
    console.log(keys, routes);

    const index = routes[0].routes.findIndex((route) => keys.includes(route.key));
    if (index >= 0) {
      history.replace(routes[0].routes[index].path);
    } else {
      history.replace('/403');
    }
  }, []);
  return <PageContainer></PageContainer>;
};

export default Home;

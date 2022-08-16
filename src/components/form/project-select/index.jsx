import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { PLATFORM } from '@/constant';
import { useLocalStorageState } from 'ahooks';
import { useDispatch, history } from 'umi';

const Index = ({ projects = [], platforms = [], initialState, setInitialState }) => {
  const dispatch = useDispatch();

  const [currentProject, setCurrentProject] = useLocalStorageState('currentProject', {
    defaultValue: initialState.currentProject * 1,
  });
  const options = projects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  useEffect(() => {
    const currentProjectObj = projects.find((item) => item.id === currentProject * 1);
    const languages = currentProjectObj?.languages || [];
    console.log('currentProject', currentProject, 'language', languages, 'projects', projects);
    dispatch({
      type: 'global/setProjectAndLanguage',
      payload: {
        projectName: currentProjectObj?.name,
        projectId: currentProject,
        languages,
      },
    });
  }, [currentProject]);
  useEffect(() => {
    dispatch({
      type: 'global/setPlatforms',
      payload: {
        platforms,
      },
    });
  }, [platforms]);

  return (
    <Select
      value={currentProject}
      defaultValue={'007'}
      onChange={(e) => {
        setInitialState({
          ...initialState,
          currentProject: e,
        });
        setCurrentProject(e);
        history.replace('/');
      }}
      style={{ width: 120 }}
      placeholder="请选择"
      options={options}
    ></Select>
  );
};

export default Index;

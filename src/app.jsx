// import { SettingDrawer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import ProjectSelect from '@/components/form/project-select';
import { Dropdown, Menu } from 'antd';
// import UploadTool from './components/upload-tool';÷
import { history } from 'umi';
import styles from './app.less';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import { getLocale } from 'umi';
import LanguageSelect from '@/components/language-select';
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  return {
    selectProjects: [{ id: 1, name: '34体育' }],
    authList: [],
    currentProject: 1,
    platforms: [
      {
        id: 1,
        created_at: '2022-03-03T09:18:17.701001Z',
        updated_at: '2022-03-03T09:18:17.701001Z',
        code: 'Android',
      },
      {
        id: 2,
        created_at: '2022-03-03T09:18:17.701001Z',
        updated_at: '2022-03-03T09:18:17.701001Z',
        code: 'IOS',
      },
      {
        id: 3,
        created_at: '2022-03-03T09:18:17.701001Z',
        updated_at: '2022-03-03T09:18:17.701001Z',
        code: 'PC',
      },
      {
        id: 4,
        created_at: '2022-03-03T03:13:54.229313Z',
        updated_at: '2022-03-03T03:13:54.229313Z',
        code: 'Server',
      },
    ],
    projects: [
      {
        id: 1,
        name: '007',
        languages: [
          {
            id: 2,
            created_at: '2022-02-28T03:22:01.99613Z',
            updated_at: '2022-02-28T03:22:01.99613Z',
            name: 'English',
            code: 'en-US',
            logo: '🇺🇸',
            field: 'enus',
            ios_code: 'en',
            g_trans_code: 'en',
          },
          {
            id: 1,
            created_at: '2022-02-28T03:22:01.99613Z',
            updated_at: '2022-02-28T03:22:01.99613Z',
            name: '简体中文',
            code: 'zh-CN',
            logo: '🇨🇳',
            field: 'zhcn',
            ios_code: 'zh-Hans',
            g_trans_code: 'zh-CN',
          },
          {
            id: 3,
            created_at: '2022-05-23T09:40:49.719788Z',
            updated_at: '2022-05-23T09:40:49.719788Z',
            name: 'Português',
            code: 'pt',
            logo: '🇵🇹',
            field: 'pt',
            ios_code: 'pt',
            g_trans_code: 'pt',
          },
          {
            id: 4,
            created_at: '2022-05-23T09:50:21.294793Z',
            updated_at: '2022-05-23T09:50:21.294793Z',
            name: 'ไทย',
            code: 'th',
            logo: '🇹🇭',
            field: 'th',
            ios_code: 'th',
            g_trans_code: 'th',
          },
          {
            id: 5,
            created_at: '2022-05-23T09:45:48.068795Z',
            updated_at: '2022-05-23T09:45:48.068795Z',
            name: 'Español',
            code: 'es',
            logo: '🇪🇸',
            field: 'es',
            ios_code: 'es',
            g_trans_code: 'es',
          },
          {
            id: 6,
            created_at: '2022-05-23T09:49:47.175012Z',
            updated_at: '2022-05-23T09:49:47.175012Z',
            name: '日本語',
            code: 'ja',
            logo: '🇯🇵',
            field: 'ja',
            ios_code: 'ja',
            g_trans_code: 'ja',
          },
          {
            id: 7,
            created_at: '2022-05-23T09:54:28.489158Z',
            updated_at: '2022-05-23T09:54:28.489158Z',
            name: '한국어',
            code: 'ko',
            logo: '🇰🇷',
            field: 'ko',
            ios_code: 'ko',
            g_trans_code: 'ko',
          },
          {
            id: 8,
            created_at: '2022-05-23T09:56:41.601734Z',
            updated_at: '2022-05-23T09:56:41.601734Z',
            name: 'Tiếng Việt',
            code: 'vi',
            logo: '🇻🇳',
            field: 'vi',
            ios_code: 'vi',
            g_trans_code: 'vi',
          },
          {
            id: 9,
            created_at: '2022-05-23T10:00:14.210792Z',
            updated_at: '2022-05-23T10:00:14.210792Z',
            name: 'Bahasa Melayu',
            code: 'ms',
            logo: '🇲🇾',
            field: 'ms',
            ios_code: 'ms',
            g_trans_code: 'ms',
          },
          {
            id: 10,
            created_at: '2022-05-23T10:08:44.20584Z',
            updated_at: '2022-05-23T10:08:44.20584Z',
            name: 'Bahasa Indonesia',
            code: 'id',
            logo: '🇮🇩',
            field: 'idn',
            ios_code: 'id',
            g_trans_code: 'id',
          },
          {
            id: 11,
            created_at: '2022-05-23T10:08:44.20584Z',
            updated_at: '2022-05-23T10:08:44.20584Z',
            name: 'العربية‎',
            code: 'ar',
            logo: '',
            field: 'ar',
            ios_code: 'ar',
            g_trans_code: 'ar',
          },
        ],
      },
    ],
  };
}

export const layout = ({ initialState, setInitialState }) => {
  console.log('initialState', initialState);
  const locale = getLocale();
  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item
        key="logout"
        onClick={() => {
          localStorage.clear();
          history.push('/user/login');
        }}
      >
        {/* <LogoutOutlined /> */}
        退出登录
      </Menu.Item>
    </Menu>
  );
  return {
    rightContentRender: () => {
      return (
        <div className={styles.project_box}>
          <ProjectSelect
            projects={initialState?.projects || []}
            platforms={initialState?.platforms || []}
            initialState={initialState}
            setInitialState={setInitialState}
          />
          <LanguageSelect />
          <Dropdown overlay={menu}>
            <div style={{ color: '#fff', marginLeft: 10, cursor: 'pointer' }}>34 体育</div>
          </Dropdown>
        </div>
      );
    },
    disableContentMargin: false,
    onPageChange: () => {},
    menuHeaderRender: null,
    childrenRender: (children, props) => {
      return (
        <ConfigProvider locale={locale.includes('en') ? enUS : zhCN}>{children}</ConfigProvider>
      );
    },
  };
};

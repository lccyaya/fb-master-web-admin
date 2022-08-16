import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import { useLocalStorageState } from 'ahooks';
import Banners from './banners';
import Popups from './popups';
import { useIntl } from 'umi';
const Banner = () => {
  const intl = useIntl();
  const [activeKey, setActiveKey] = useLocalStorageState('007_banner_key', {
    defaultValue: 'banners',
  });
  const tabList = [
    {
      name: 'Banner',
      key: 'banners',
    },
    {
      name: intl.formatMessage({ id: 'Popups' }),
      key: 'popups',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Tabs activeKey={activeKey} onChange={setActiveKey} size="large">
          {tabList.map((item) => {
            return <Tabs.TabPane tab={item.name} key={item.key} />;
          })}
        </Tabs>
        {activeKey === 'popups' ? <Popups /> : null}
        {activeKey === 'banners' ? <Banners /> : null}
      </Card>
    </PageContainer>
  );
};

export default Banner;

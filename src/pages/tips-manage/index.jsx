import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import { connect, useIntl } from 'umi';
import React, { useState } from 'react';
import TipsList from './list';
import CreateTips from './create';
import { useLocalStorageState } from 'ahooks';

const TipsManage = ({}) => {
  const intl = useIntl();
  const [activeKey, setActiveKey] = useLocalStorageState('currentTipsKey', {
    defaultValue: 'list',
  });
  const tabList = [
    {
      key: 'list',
      name: intl.formatMessage({ id: 'Tips List' }),
    },
    {
      key: 'create',
      name: intl.formatMessage({ id: 'Add Tips' }),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Tabs activeKey={activeKey} onChange={setActiveKey} size="large">
          {tabList.map((item) => {
            return <Tabs.TabPane key={item.key} tab={item.name} />;
          })}
        </Tabs>
        {activeKey === 'list' ? <TipsList /> : null}
        {activeKey === 'create' ? <CreateTips /> : null}
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({}))(TipsManage);

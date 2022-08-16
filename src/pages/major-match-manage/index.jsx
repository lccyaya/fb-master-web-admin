import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import MajorMatch from './list';
import CreateMajorMatch from './create';
import { connect, useIntl } from 'umi';
import React, { useState } from 'react';
import { useLocalStorageState } from 'ahooks';

const MajorMatchManage = ({}) => {
  const intl = useIntl();
  const [activeKey, setActiveKey] = useLocalStorageState('currentMajorMatchKey', {
    defaultValue: 'list',
  });
  const tabList = [
    {
      name: intl.formatMessage({ id: 'MajorMatch List' }),
      key: 'list',
    },
    {
      name: intl.formatMessage({ id: 'Add MajorMatch' }),
      key: 'create',
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
        {activeKey === 'list' ? <MajorMatch /> : null}
        {activeKey === 'create' ? <CreateMajorMatch /> : null}
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({}))(MajorMatchManage);

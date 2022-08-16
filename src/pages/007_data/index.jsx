import { useLocalStorageState } from 'ahooks';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
const { TabPane } = Tabs;
// import DetailedData from './detailed-data';
import ChannelData from './channel-data';
import { useIntl } from 'umi';

const Data = () => {
  const intl = useIntl();
  const [activeKey, setActiveKey] = useLocalStorageState('currentDataKey', {
    defaultValue: 'channel',
  });
  const tabList = [
    // {
    //   name: intl.formatMessage({ id: 'Detailed Data' }),
    //   key: 'details',
    // },
    {
      name: intl.formatMessage({ id: 'Channel Data' }),
      key: 'channel',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Tabs activeKey={activeKey} onChange={setActiveKey} size="large">
          {tabList.map((item) => {
            return <TabPane tab={item.name} key={item.key} />;
          })}
        </Tabs>
        <ChannelData />
      </Card>
    </PageContainer>
  );
};
export default Data;

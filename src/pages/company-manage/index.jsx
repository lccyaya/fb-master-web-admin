import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import { connect } from 'umi';
import { useEffect, useState } from 'react';
import DataTable from './table';
import { useIntl } from 'umi';
import uniq from 'lodash/uniq';

const CompanyManage = ({}) => {
  const intl = useIntl();
  const ListItem = [
    {
      name: intl.formatMessage({ id: '1X2' }),
      key: 'eu',
    },
    {
      name: intl.formatMessage({ id: 'Handicap' }),
      key: 'asia',
    },
    {
      name: intl.formatMessage({ id: 'Over/Under' }),
      key: 'bs',
    },
  ];
  const [activeKey, setActiveKey] = useState('eu');
  const [sortData, setSortData] = useState([]);
  const [hotData, setHotData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    API_SPORT.get('company.list', '', {
      cate: activeKey,
    })
      .then(APIFilter)
      .then((e) => {
        const { hot, sort } = e;
        const hotIds = hot.map((i) => i.id);
        setLoading(false);
        setHotData(hot);
        setSortData(sort.filter((i) => !hotIds.includes(i.id)));
      });
  };

  useEffect(() => {
    fetchData();
  }, [activeKey]);
  const onHotCancel = (id) => {
    const arr = hotData
      .map((item) => item.id)
      .filter((item) => {
        return item !== id;
      });
    API_SPORT.post('comset.update', '', {
      cate: activeKey,
      hot: JSON.stringify(arr),
      sort: JSON.stringify(arr),
    })
      .then(APIFilter)
      .then((e) => {
        fetchData();
      });
  };
  const onHotSet = (id) => {
    const arr = [...hotData.map((item) => item.id), id];
    API_SPORT.post('comset.update', '', {
      cate: activeKey,
      hot: JSON.stringify(arr),
      sort: JSON.stringify(arr),
    })
      .then(APIFilter)
      .then((e) => {
        fetchData();
      });
  };
  const onSortSet = (id) => {
    const arr = uniq([id, ...hotData.map((item) => item.id)]);
    API_SPORT.post('comset.update', '', {
      cate: activeKey,
      hot: JSON.stringify(arr),
      sort: JSON.stringify(arr),
    })
      .then(APIFilter)
      .then((e) => {
        fetchData();
      });
  };
  return (
    <PageContainer>
      <Card>
        <Tabs onChange={setActiveKey} size="large">
          {ListItem.map((item) => {
            return <Tabs.TabPane tab={item.name} key={item.key} />;
          })}
        </Tabs>
        <DataTable
          sortData={sortData}
          hotData={hotData}
          onHotCancel={onHotCancel}
          onHotSet={onHotSet}
          onSortSet={onSortSet}
          loading={loading}
          activeKey={activeKey}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({}))(CompanyManage);

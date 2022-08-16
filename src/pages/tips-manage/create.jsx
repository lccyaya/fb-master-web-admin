import { Table, Form, DatePicker, message } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import moment from 'moment';
import { APIFilter, API_SPORT } from '@/api';
import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.module.less';
const { RangePicker } = DatePicker;
import classnames from 'classnames';
import Edit from './edit';
import CompetitionsTreeSelect from '@/components/competitions-tree-select';
const TipsList = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [curRecord, setCurRecord] = useState({});

  const columns = [
    {
      title: intl.formatMessage({ id: 'Match Time' }),
      dataIndex: 'match_time',
      search: false,
      hideInTable: false,
      width: 200,
      render: (text) => moment(new Date(+text * 1000)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({ id: 'Competition' }),
      dataIndex: 'competition_name',
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'Team' }),
      dataIndex: 'home_team_name',
      search: false,
      valueType: 'select',
      render: (_, record) => {
        return (
          <div>
            {`${record.home_team_name}`} <span style={{ fontWeight: 900 }}>VS</span>{' '}
            {`${record.away_team_name}`}
          </div>
        );
      },
    },
    {
      title: useIntl().formatMessage({ id: 'Handicap' }),
      dataIndex: 'odds',
      search: false,
      width: 180,
      valueType: 'select',
      render: (_, record) => {
        if (record && record.odds && record.odds.asia) {
          return (
            <div className={styles.odds}>
              <div style={{ marginRight: 5 }} className={classnames(styles.item)}>
                <div>{intl.formatMessage({ id: 'Home' })}</div>
                <div>{record.odds.asia.home}</div>
              </div>
              <div className={classnames(styles.item)}>
                <div>{intl.formatMessage({ id: 'Handicap' })}</div>
                <div>
                  {record.odds.asia.draw > 0 ? `+${record.odds.asia.draw}` : record.odds.asia.draw}
                </div>
              </div>
              <div style={{ marginLeft: 5 }} className={classnames(styles.item)}>
                <div>{intl.formatMessage({ id: 'Away' })}</div>
                <div>{record.odds.asia.away}</div>
              </div>
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: useIntl().formatMessage({ id: 'Operation' }),
      valueType: 'option',
      fixed: 'right',
      render: (text, record, _, action) => {
        return (
          <a
            onClick={() => {
              setCurRecord(record);
              setVisible(true);
            }}
          >
            {intl.formatMessage({ id: 'Add' })}
          </a>
        );
      },
    },
  ].filter((e) => e);
  const render = (date) => {
    return date && moment(moment(date).format('YYYY-MM-DD')).valueOf() / 1000;
  };
  const getList = ({ current, pageSize = 10 }, { match_time = [], competitions }) => {
    const [begin, end] = match_time;
    let _startTime = render(begin);
    let _endTime = render(end) && render(end) + 24 * 60 * 60;
    if (!_endTime && !_startTime) {
      _startTime = Math.floor(new Date().getTime() / 1000);
      _endTime = _startTime + 7 * 24 * 60 * 60;
    }
    return API_SPORT.post('match.competitions', '', {
      page: current,
      size: pageSize,
      begin: _startTime,
      end: _endTime,
      competitions,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.matches,
          total: e?.total,
        };
      });
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });

  const onSuccess = (values) => {
    setLoading(true);
    const { match_id, odds_type, confidence } = values;
    API_SPORT.post('match.tips', '', { match_id, odds_type, confidence })
      .then(APIFilter)
      .then((data) => {
        message.success(intl.formatMessage({ id: 'Add success' }));
        refresh();
        setVisible(false);
        setCurRecord({});
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    search?.reset();
  }, []);
  return (
    <>
      <Search
        refresh={refresh}
        form={form}
        submit={search?.submit}
        reset={search?.reset}
        nodes={[
          {
            label: intl.formatMessage({ id: 'Competition' }),
            name: 'competitions',
            node: <CompetitionsTreeSelect />,
          },
          {
            label: intl.formatMessage({ id: 'Match Time' }),
            name: 'match_time',
            node: <RangePicker format="YYYY-MM-DD" showTime={false} />,
          },
        ]}
      />
      <Table
        bordered
        rowKey="match_id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
      <Edit
        visible={visible}
        loading={loading}
        setVisible={setVisible}
        title={intl.formatMessage({ id: 'Setting' })}
        data={curRecord}
        onCancel={() => {
          console.log(88888);
          setVisible(false);
        }}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default connect(({ global }) => ({}))(TipsList);

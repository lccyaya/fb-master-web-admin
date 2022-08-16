import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import moment from 'moment';
import { message, Alert, Button, Table, DatePicker, Form } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.module.less';
import { getScore } from '@/utils/index';
const { RangePicker } = DatePicker;
import CompetitionsTreeSelect from '@/components/competitions-tree-select';

const MajorMatch = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: intl.formatMessage({ id: 'Match Time' }),
      dataIndex: 'match_time',
      search: false,
      hideInTable: false,
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
      title: intl.formatMessage({ id: '1X2' }),
      dataIndex: 'odds',
      search: false,
      valueType: 'select',
      render: (_, record) => {
        if (record && record.odds && record.odds.eu) {
          return (
            <div className={styles.odds}>
              <div className={styles.item}>
                <div>WIN</div>
                <div>{record.odds.eu.home}</div>
              </div>
              <div className={styles.item}>
                <div>DRAW</div>
                <div>{record.odds.eu.draw}</div>
              </div>
              <div className={styles.item}>
                <div>LOSE</div>
                <div>{record.odds.eu.away}</div>
              </div>
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Score' }),
      dataIndex: 'odds',
      search: false,
      valueType: 'select',
      render: (_, record) => {
        return `${getScore(record.home_score)}:${getScore(record.away_score)}`;
      },
    },

    {
      title: intl.formatMessage({ id: 'Operation' }),
      valueType: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={async () => {
            addMajor([record.match_id]);
          }}
        >
          {intl.formatMessage({ id: 'Add' })}
        </a>,
      ],
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
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const addMajor = (matches) => {
    setLoading(true);
    API_SPORT.post('match.major', '', { matches, major: true })
      .then(APIFilter)
      .then((data) => {
        message.success(intl.formatMessage({ id: 'Add success' }));
        refresh();
        setLoading(false);
        setSelectedRowKeys([]);
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
      {hasSelected ? (
        <Alert
          action={
            <Button
              type="link"
              onClick={() => {
                setSelectedRowKeys([]);
              }}
            >
              {intl.formatMessage({ id: 'Cancel selection' })}
            </Button>
          }
          message={
            <>
              <span style={{ marginLeft: 8 }}>{`${intl.formatMessage({ id: 'Selected' })} ${
                selectedRowKeys.length
              }`}</span>
              <Button
                type="link"
                loading={loading}
                onClick={() => {
                  addMajor(selectedRowKeys);
                }}
              >
                {intl.formatMessage({ id: 'Add' })}
              </Button>
            </>
          }
        />
      ) : null}
      <Table
        bordered
        columns={columns}
        rowKey="match_id"
        scroll={{ x: 'max-content' }}
        {...tableProps}
        rowSelection={rowSelection}
      />
    </>
  );
};

export default connect(({ global }) => ({}))(MajorMatch);

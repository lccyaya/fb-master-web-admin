import { CheckCircleOutlined } from '@ant-design/icons';
import { Table, Form, DatePicker, message, Space, Modal } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import moment from 'moment';
import { APIFilter, API_SPORT } from '@/api';
import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.module.less';
import { getScore } from '@/utils/index';
const { RangePicker } = DatePicker;
import { MATCH_RESULT, ODD_TYPE } from '@/constant';
import Edit from './edit';
const TipsList = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
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
      title: intl.formatMessage({ id: 'Handicap' }),
      dataIndex: 'odds',
      search: false,
      width: 180,
      valueType: 'select',
      render: (_, record) => {
        if (record && record.odds && record.odds.asia) {
          return (
            <div className={styles.odds}>
              <div style={{ marginRight: 5 }} className={styles.item}>
                <div>{intl.formatMessage({ id: 'Home' })}</div>
                <div>{record.odds.asia.home}</div>
                <div>
                  {record.odds_type === ODD_TYPE.HOME && <CheckCircleOutlined color="#39906A" />}
                </div>
              </div>
              <div className={styles.item}>
                <div>{intl.formatMessage({ id: 'Handicap' })}</div>
                <div>
                  {record.odds.asia.draw > 0 ? `+${record.odds.asia.draw}` : record.odds.asia.draw}
                </div>
                <div>
                  {record.odds_type === ODD_TYPE.DRAW && <CheckCircleOutlined color="#39906A" />}
                </div>
              </div>
              <div style={{ marginLeft: 5 }} className={styles.item}>
                <div>{intl.formatMessage({ id: 'Away' })}</div>
                <div>{record.odds.asia.away}</div>
                <div>
                  {record.odds_type === ODD_TYPE.AWAY && <CheckCircleOutlined color="#39906A" />}
                </div>
              </div>
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Confidence' }),
      dataIndex: 'confidence',
      width: 100,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'Score' }),
      width: 60,
      dataIndex: 'odds',
      search: false,
      valueType: 'select',
      render: (_, record) => {
        return `${getScore(record.home_score)}:${getScore(record.away_score)}`;
      },
    },
    {
      title: intl.formatMessage({ id: 'Result' }),
      dataIndex: 'result',
      search: false,
      render: (text) => {
        return text === MATCH_RESULT.WIN
          ? 'WIN'
          : text === MATCH_RESULT.LOSE
          ? 'LOSE'
          : text === MATCH_RESULT.DRAW
          ? 'DRAW'
          : '-';
      },
    },

    {
      title: useIntl().formatMessage({ id: 'Operation' }),
      valueType: 'option',
      fixed: 'right',
      render: (text, record, _, action) => {
        return (
          <Space>
            <a
              onClick={() => {
                setCurRecord(record);
                setVisible(true);
              }}
            >
              {intl.formatMessage({ id: 'Modify' })}
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  title: '删除提醒',
                  content: '确定要删除该预测吗？',
                  onOk: () => {
                    deleteTip(record.match_id);
                  },
                });
              }}
            >
              {intl.formatMessage({ id: 'Delete' })}
            </a>
          </Space>
        );
      },
    },
  ].filter((e) => e);
  const render = (date) => {
    return date && moment(moment(date).format('YYYY-MM-DD')).valueOf() / 1000;
  };
  const getUserList = ({ current, pageSize = 10 }, { match_time }) => {
    return API_SPORT.get('match.tips', '', {
      page: current,
      size: pageSize,
      begin: render(match_time?.[0]),
      end: render(match_time?.[1]) && render(match_time?.[1]) + 24 * 60 * 60,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.matches,
          total: e?.total,
        };
      });
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getUserList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  const deleteTip = async (match_id) => {
    API_SPORT.delete(`match.tips?match_id=${match_id}`, '')
      .then(APIFilter)
      .then((data) => {
        message.success(intl.formatMessage({ id: 'Delete success' }));
        refresh();
      });
  };
  const onSuccess = (values) => {
    const { match_id, odds_type, confidence } = values;
    API_SPORT.post('match.tips', '', { match_id, odds_type, confidence })
      .then(APIFilter)
      .then((data) => {
        message.success(intl.formatMessage({ id: 'Modify success' }));
        refresh();
        setVisible(false);
        setCurRecord({});
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
        setVisible={setVisible}
        title={intl.formatMessage({ id: 'Setting' })}
        data={curRecord}
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default connect(({ global }) => ({}))(TipsList);

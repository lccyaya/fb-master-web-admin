import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Form, Table, Space, Tooltip, Modal, Typography, message } from 'antd';
import { connect } from 'umi';
import { useAntdTable } from 'ahooks';
import Search from '@/components/search';
import ConstantSelect from '@/components/form/constant-select';
import { SCHEME_PLAY, SCHEME_STATE } from '@/constant';
import { APIFilter, API_SPORT } from '@/api';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.module.less';
import CreateScheme from './components/create-scheme';

// const { Text } = Typography;

const Page = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const columns = [
    {
      title: '方案ID',
      width: 120,
      render: (record) => {
        return record.id;
      },
    },
    {
      title: '专家',
      width: 120,
      render: (record) => {
        return record.expert_name;
      },
    },
    {
      title: '比赛',
      width: 200,
      render: (record) => {
        return (
          <div>
            <div>{record.competition_name}</div>
            <div>{moment(record.match_time * 1000).format('YYYY-MM-DD HH:mm')}</div>
            <div>{`${record.home_team_name}vs${record.away_team_name}`}</div>
          </div>
        );
      },
    },
    {
      title: '推荐项',
      width: 300,
      render: (record) => {
        return (
          <div>
            <div>{record?.play_odds?.scheme_title}</div>
            <Space size={40}>
              {record?.play_odds?.odds?.map((item) => {
                return (
                  <div>
                    <div>{item.title}</div>
                    <div>{item.odd}</div>
                    <div style={{ width: 20, height: 20 }}>
                      {item.selected ? <CheckOutlined style={{ color: 'green' }} /> : null}
                    </div>
                  </div>
                );
              })}
            </Space>
          </div>
        );
      },
    },
    {
      title: '分析',
      width: 500,
      render: (record) => {
        return (
          <Tooltip className={styles.fenxi} title={record.detail} placement="topLeft">
            {record.detail || '-'}
          </Tooltip>
        );
      },
    },
    {
      title: '定价',
      width: 120,
      render: (record) => {
        return record.gold_coin ? record.gold_coin + '金币' : '免费';
      },
    },
    {
      title: '付费/查看(次)',
      width: 120,
      render: (record) => {
        return record.doc_num + '/' + record.visit_num;
      },
    },
    {
      title: '发布时间',
      width: 200,
      render: (record) => {
        return moment(record.published_at * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '比赛状态',
      width: 120,
      render: (record) => {
        return <div>{record.match_status}</div>;
      },
    },
    {
      title: '方案状态',
      width: 120,
      render: (record) => {
        return SCHEME_STATE[record.state];
      },
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (record) => {
        return (
          <Space>
            <a
              onClick={() => {
                ReactDOM.unstable_batchedUpdates(() => {
                  setVisible(true);
                  setDetail(record);
                });
              }}
            >
              {record.state === SCHEME_STATE.HIT || record.state === SCHEME_STATE.NOT_HIT
                ? '查看'
                : '编辑'}
            </a>
            {/* <a onClick={() => {}}>查看</a> */}
            {record.state === SCHEME_STATE.SALE ? (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: '停售',
                    content: '停止售卖后未查看的用户将不可查看分析，是否确认停售？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                      API_SPORT.post('scheme.state-modify', '', {
                        id: record.id,
                        state: SCHEME_STATE.STOP_SALE,
                      })
                        .then(APIFilter)
                        .then((e) => {
                          message.success('操作成功');
                          search.submit();
                        });
                    },
                  });
                }}
                style={{ color: 'red' }}
              >
                停售
              </a>
            ) : null}
            {record.state === SCHEME_STATE.WAIT ? (
              <a
                style={{ color: 'red' }}
                onClick={() => {
                  Modal.confirm({
                    title: '删除',
                    content: '发布前可删除，是否确认删除？',
                    okText: '删除',
                    cancelText: '取消',
                    onOk: () => {
                      API_SPORT.get('scheme.del', '', {
                        id: record.id,
                      })
                        .then(APIFilter)
                        .then((e) => {
                          message.success('删除成功');
                          search.submit();
                        });
                    },
                  });
                }}
              >
                删除
              </a>
            ) : null}
          </Space>
        );
      },
    },
  ];
  const getSchemeList = ({ current, pageSize = 10 }, query) => {
    return API_SPORT.get('scheme.list', '', {
      page: current,
      size: pageSize,
      ...query,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e.list,
          total: e.total,
        };
      });
  };
  const { tableProps, search, refresh } = useAntdTable(getSchemeList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  useEffect(() => {
    search.reset();
  }, []);
  return (
    <PageContainer>
      <Card>
        <Search
          form={form}
          submit={search?.submit}
          add={() => {
            ReactDOM.unstable_batchedUpdates(() => {
              setVisible(true);
              setDetail(null);
            });
          }}
          reset={search?.reset}
          refresh={refresh}
          nodes={[
            {
              label: '方案ID',
              name: 'scheme_id',
              node: <Input placeholder="请输入" allowClear />,
            },
            {
              label: '比赛ID',
              name: 'match_id',
              node: <Input placeholder="请输入" allowClear />,
            },
            {
              label: '专家名称',
              name: 'expert_name',
              node: <Input placeholder="请输入" allowClear />,
            },
            {
              label: '玩法',
              name: 'play',
              node: <ConstantSelect constant={SCHEME_PLAY} noAll />,
            },
            {
              label: '方案状态',
              name: 'state',
              node: <ConstantSelect constant={SCHEME_STATE} noAll />,
            },
          ]}
        />
        <Table bordered columns={columns} {...tableProps} scroll={{ x: 'max-content' }} />
        <CreateScheme
          visible={visible}
          onSuccess={() => {
            setVisible(false);
            if (detail?.id) {
              refresh();
            } else {
              search?.submit();
            }
          }}
          detail={detail}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({
  languages: global.languages,
  projectId: global.projectId,
  projectName: global.projectName,
}))(Page);

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Form, Input, Image, Space, Select } from 'antd';
import { connect } from 'umi';
import { useAntdTable } from 'ahooks';
import Search from '@/components/search';
import { APIFilter, API_SPORT } from '@/api';
import CreateExpert from './components/create-expert';
import EditExpert from './components/Edit';
import IsDisable from "./components/IsDisable"

const Page = ({ projectId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(0);
  const [detail, setDetail] = useState(null);
  const getExpertList = ({ current, pageSize = 10 }, query) => {
    return API_SPORT.get('expert/manage', '', {
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
  const categorys = [
    {
      value: "1",
      label: "审核通过"
    },
    {
      value: "2",
      label: "审核失败"
    },
    {
      value: "3",
      label: "待审核"
    },
    {
      value: "4",
      label: "禁用"
    },
  ]
  const { tableProps, search, refresh } = useAntdTable(getExpertList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  const columns = [
    {
      title: '专家ID',
      width: 120,
      render: (record) => {
        return record.id;
      },
    },
    {
      title: '专家昵称',
      width: 120,
      render: (record) => {
        return record.nickname;
      },
    },
    {
      title: '头像',
      width: 100,
      render: (record) => {
        return <Image height={100} width={100} src={record.avatar} />;
      },
    },
    {
      title: '简介',
      width: 300,
      render: (record) => {
        return record.introduce;
      },
    },
    {
      title: '粉丝数',
      width: 120,
      render: (record) => {
        return <div>{record.fans_num}</div>;
      },
    },
    {
      title: '总发布',
      width: 120,
      render: (record) => {
        return <div>{record.scheme_num}</div>;
      },
    },
    {
      title: '总命中率',
      width: 120,
      render: (record) => {
        return <div>{record.hit_rate}%</div>;
      },
    },
    {
      title: '总收益',
      width: 120,
      render: (record) => {
        return <div>{record.amount}</div>;
      },
    },
    {
      title: '累计售出',
      width: 120,
      render: (record) => {
        return <div>{record.sale_num}</div>;
      },
    },
    {
      title: '可结算',
      width: 120,
      render: (record) => {
        return <div>{record.settlement_amount}</div>;
      },
    },
    {
      title: '分成比例',
      width: 120,
      render: (record) => {
        return <div>{record.commission_rate}</div>;
      },
    },
    // {
    //   title: '统计',
    //   width: 120,
    //   render: (record) => {
    //     return (
    //       <div>
    //         <div>命中率：{record.hit_rate}%</div>
    //         <div>最近连中：{record.recent_loop_hit_num}</div>
    //         <div>最长连中：{record.max_hit}</div>
    //       </div>
    //     );
    //   },
    // },
    {
      title: '审核状态',
      width: 100,
      render: (record) => {
        let color = 'black';
        let des = '待审核';
        if (record.status == 1) {
          color = 'green';
          des = '审核通过';
        }
        if (record.status == 2) {
          color = 'red';
          des = '审核失败';
        }
        if (record.status == 4) {
          color = '#999999';
          des = '禁用';
        }
        return <div style={{ color }}>{des}</div>;
      },
    },
    {
      title: '操作',
      width: 120,
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
              编辑
            </a>
            {record.status == 3 ? (
              <a
                onClick={() => {
                  ReactDOM.unstable_batchedUpdates(() => {
                    setEditVisible(true);
                    setDetail(record);
                  });
                }}
              >
                审核
              </a>
            ) : null}
            {record.status == 1 ? (
              <a
                onClick={() => {
                  setIsModalOpen(4)
                  setDetail(record);
                }}
              >
                禁用
              </a>
            ) : null}
            {record.status == 4 ? (
              <a
                onClick={() => {
                  setIsModalOpen(1)
                  setDetail(record);
                }}
              >
                启用
              </a>
            ) : null}
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    search.reset();
  }, [projectId]);

  return (
    <PageContainer>
      <Card>
        <Search
          refresh={refresh}
          add={() => {
            ReactDOM.unstable_batchedUpdates(() => {
              setVisible(true);
              setDetail(null);
            });
          }}
          form={form}
          submit={search?.submit}
          reset={search?.reset}
          nodes={[
            {
              label: '专家昵称',
              name: 'nickname',
              node: <Input placeholder="请输入" allowClear />,
            },
            {
              label: '专家状态',
              name: 'status',
              node: <Select
                style={{ width: 160 }}
                placeholder="请选择"
                allowClear
                options={categorys}
              />
            },
          ]}
        />
        <Table bordered columns={columns} {...tableProps} scroll={{ x: 'max-content' }} />
        <CreateExpert
          visible={visible}
          detail={detail}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={() => {
            setVisible(false);
            search?.reset();
          }}
        />
        <EditExpert
          visible={editVisible}
          detail={detail}
          onCancel={() => {
            setEditVisible(false);
          }}
          onSuccess={() => {
            setEditVisible(false);
            search?.reset();
          }}
        />
        <IsDisable onOk={() => {
          setIsModalOpen(0)
          search?.reset();
        }}
          handleCancel={() => {
            setIsModalOpen(0)
          }}
          isModalOpen={isModalOpen} detail={detail} />

      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({
  languages: global.languages,
  projectId: global.projectId,
  projectName: global.projectName,
}))(Page);


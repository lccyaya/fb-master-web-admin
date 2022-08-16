import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Form, Input, Image, Space } from 'antd';
import { connect } from 'umi';
import { useAntdTable } from 'ahooks';
import Search from '@/components/search';
import { APIFilter, API_SPORT } from '@/api';
import CreateExpert from './components/create-expert';

const Page = ({ projectId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const getExpertList = ({ current, pageSize = 10 }, query) => {
    return API_SPORT.get('expert.list', '', {
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
  const { tableProps, search, refresh } = useAntdTable(getExpertList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  const columns = [
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
      title: '总方案数',
      width: 120,
      render: (record) => {
        return <div>{record.scheme_num}</div>;
      },
    },
    {
      title: '总收益',
      width: 120,
      render: (record) => {
        return <div>{record.profit}</div>;
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
      title: '统计',
      width: 120,
      render: (record) => {
        return (
          <div>
            <div>命中率：{record.hit_rate}%</div>
            <div>最近连中：{record.recent_loop_hit_num}</div>
            <div>最长连中：{record.max_hit}</div>
          </div>
        );
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
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({
  languages: global.languages,
  projectId: global.projectId,
  projectName: global.projectName,
}))(Page);

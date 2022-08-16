import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Input, Form, Image, Space, Select } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import FeedbackDetail from './components/feedback-detail';
import api, { APIFilter, API_FEEDBACK } from '@/api';
import { FEEDBACK_STATUS, FEEDBACK_STATUS_COLOR } from '@/constant';
import ConstantSelect from '@/components/form/constant-select';
import { connect } from 'umi';
// import ProjectSelect from '@/components/form/project-select';

const FeedbackManage = ({ projectId, projectName }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const columns = [
    {
      title: '操作系统',
      dataIndex: 'platform',
      width: 120,
      fixed: 'left',
    },
    {
      title: '型号',
      width: 120,
      render: (record) => {
        return record.product || '-';
      },
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      width: 120,
    },
    {
      title: '问题类型',
      width: 200,
      render: (record) => {
        return record.category_name || '-';
      },
    },
    {
      title: '图片',
      width: 250,
      render: (record) => {
        if (!record.images) {
          return '暂无图片';
        }
        return (
          <Image.PreviewGroup>
            <Space>
              {record.images?.map((_img) => {
                return <Image width={40} height={40} src={_img} />;
              })}
            </Space>
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: '问题描述',
      width: 300,
      render: (record) => {
        return record.description || '-';
      },
    },
    {
      title: '邮箱',
      width: 250,
      render: (record) => {
        return <p style={{ width: 250 }}>{record.email || '-'}</p>;
      },
    },
    {
      title: '处理状态',
      width: 100,
      render: (record) => {
        return (
          <div style={{ color: FEEDBACK_STATUS_COLOR[record.status] }}>
            {FEEDBACK_STATUS[record.status]}
          </div>
        );
      },
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (record) => {
        return (
          <a
            onClick={() => {
              ReactDOM.unstable_batchedUpdates(() => {
                setVisible(true);
                setDetail(record);
              });
            }}
          >
            查看
          </a>
        );
      },
    },
  ];
  const getList = ({ current, pageSize = 10 }, query) => {
    return API_FEEDBACK.get('feedback.questions', '', {
      page: current,
      size: pageSize,
      ...query,
      project_id: projectId,
      project: projectName,
    })
      .then(APIFilter)
      .then((e) => {
        console.log(e);
        return {
          list: e.list,
          total: e.total,
        };
      });
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });

  useEffect(async () => {
    if (projectId && projectName) {
      await API_FEEDBACK.get('feedback.category', '', {
        project_id: projectId,
        project: projectName,
      })
        .then(APIFilter)
        .then((data) => {
          setCategorys(
            data?.map((_item) => {
              return {
                value: _item.id,
                label: _item.content,
              };
            }),
          );
        });
    }
    search?.reset();
  }, [projectId, projectName]);
  return (
    <PageContainer>
      <Card>
        <Search
          refresh={refresh}
          form={form}
          submit={search?.submit}
          reset={search?.reset}
          nodes={[
            {
              label: '问题类型',
              name: 'category_id',
              node: (
                <Select
                  style={{ width: 160 }}
                  placeholder="请输入"
                  allowClear
                  options={categorys}
                ></Select>
              ),
            },
            {
              label: '处理状态',
              name: 'status',
              node: <ConstantSelect constant={FEEDBACK_STATUS} />,
            },
          ]}
        />
        <Table bordered columns={columns} scroll={{ x: 'max-content' }} {...tableProps} />
      </Card>
      <FeedbackDetail
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
    </PageContainer>
  );
};

export default connect(({ global }) => ({
  languages: global.languages,
  projectId: global.projectId,
  projectName: global.projectName,
}))(FeedbackManage);

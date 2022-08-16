import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Input, Form, Select } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import CreateVersion from './components/create-version';
import api, { APIFilter, API_SPORT } from '@/api';
import PlatformSelect from '@/components/form/paltform-select';
import { connect } from 'umi';
import { useEffect } from 'react';

const VersionManage = ({ projectName, languages, projectId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const columns = [
    {
      title: '版本号',
      dataIndex: 'version',
      width: 120,
      fixed: 'left',
    },
    {
      title: '客户端',
      width: 200,
      render: (record) => {
        return record.platform;
      },
    },
    projectName === '007'
      ? {
          title: '项目',
          width: 120,
          render: (record) => {
            return { 0: '国际版', 1: '国内版' }[record.project];
          },
        }
      : null,
    {
      title: '更新内容',
      width: 500,
      render: (record) => {
        return record.tips_en;
      },
    },
    {
      title: '下载链接',
      width: 300,
      render: (record) => {
        return record.download_link;
      },
    },
    {
      title: '提示更新',
      width: 100,
      render: (record) => {
        return record.is_notice ? '是' : '否';
      },
    },
    {
      title: '强制更新',
      width: 100,
      render: (record) => {
        return record.is_force ? '是' : '否';
      },
    },
    {
      title: '操作',
      width: 100,
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
            编辑
          </a>
        );
      },
    },
  ].filter((e) => e);
  const getVerisonList = ({ current, pageSize = 10 }, query) => {
    if (projectName === '007') {
      return API_SPORT.get('upgrade.list', '', {
        page: current,
        size: pageSize,
        ...query,
      })
        .then(APIFilter)
        .then((e) => {
          return {
            list:
              e.list?.map((item) => {
                item.id = item.ID || item.id;
                return item;
              }) || [],
            total: e.total,
          };
        });
    } else {
      return api
        .get('upgrade.list', '', {
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
    }
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getVerisonList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  useEffect(() => {
    search?.reset();
  }, [projectName]);
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
          initialValues={{
            project: 0,
          }}
          form={form}
          submit={search?.submit}
          reset={search?.reset}
          nodes={[
            {
              label: '客户端',
              name: 'platform',
              node: <PlatformSelect />,
            },
            {
              label: '版本号',
              name: 'version',
              node: <Input placeholder="请输入" allowClear />,
            },
            projectName === '007'
              ? {
                  label: '项目',
                  name: 'project',
                  node: (
                    <Select
                      allowClear={false}
                      options={[
                        { label: '国际版', value: 0 },
                        { label: '国内版', value: 1 },
                      ]}
                    ></Select>
                  ),
                }
              : null,
          ].filter((e) => e)}
        />
        <Table bordered columns={columns} scroll={{ x: 'max-content' }} {...tableProps} />
      </Card>
      <CreateVersion
        projectId={projectId}
        projectName={projectName}
        languages={languages}
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
}))(VersionManage);

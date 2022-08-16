import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useAntdTable } from 'ahooks';
import { Card, Table, Button, Form, Select, Space, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import api, { APIFilter, API_LANGUAGE } from '@/api';
import { connect } from 'umi';

import CreateLanguageContent from './components/create-language-content/index';
import LanguageSelect from '@/components/form/language-select';

const Search = ({ form, search, platforms, languages, projectId }) => {
  const { submit, reset } = search;
  const [visible, setVisible] = useState(false);
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={{}}
      onValuesChange={submit}
      style={{ marginBottom: 16 }}
    >
      <Form.Item label="平台" name="platform_ids" style={{ marginBottom: 8 }}>
        <Select
          options={platforms}
          placeholder="请选择"
          fieldNames={{ label: 'code', value: 'id' }}
          style={{ width: 200 }}
          allowClear
          mode="multiple"
        />
      </Form.Item>
      <Form.Item label="key" name="key" style={{ marginBottom: 8 }}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="语言" name="translation_language" style={{ marginBottom: 8 }}>
        <LanguageSelect languages={languages} type="field" />
      </Form.Item>
      <Form.Item label="内容" name="translation_key" style={{ marginBottom: 8 }}>
        <Input placeholder="请输入" />
      </Form.Item>

      <Space style={{ marginBottom: 8 }}>
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
        >
          新增
        </Button>
        <Button onClick={reset}>重置</Button>
      </Space>
      <CreateLanguageContent
        projectId={projectId}
        languages={languages}
        platforms={platforms}
        visible={visible}
        onOk={() => {
          setVisible(false);
          reset();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </Form>
  );
};

const Language = ({ platforms, projectId, languages = [] }) => {
  console.log('languages', languages);
  const [form] = Form.useForm();
  const [editDetail, setEditDetail] = useState(null);
  const editRecord = (record) => {
    setEditDetail(record);
  };

  const getLanguagesContent = (
    { current, pageSize = 10 },
    { translation_language, translation_key, key, platform_ids },
  ) => {
    // /api/admin/language/translation
    return API_LANGUAGE.post('language.translation', '', {
      page: current,
      size: pageSize,
      platform_ids,
      key,

      translation:
        translation_language && translation_key
          ? {
              [translation_language]: translation_key,
            }
          : undefined,
      project_id: projectId,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e.list,
          total: e.total,
        };
      });
  };
  const { tableProps, search } = useAntdTable(getLanguagesContent, {
    defaultPageSize: 10,
    form,
    manual: true,
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'key',
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '操作系统',
      width: 140,
      render: (records) => {
        return records.Platforms.map((e) => e.code).join(',');
      },
    },
    {
      title: 'English',
      dataIndex: 'enus',
      width: 300,
    },
    {
      title: '简体中文',
      dataIndex: 'zhcn',
      width: 300,
    },
    {
      title: '最后编辑时间',
      width: 200,
      render: (record) => {
        return moment(record.updated_at).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      width: 80,
      render: (record) => {
        return (
          <div>
            <a onClick={() => editRecord(record)}>编辑</a>
          </div>
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
          platforms={platforms}
          form={form}
          search={search}
          languages={languages}
          projectId={projectId}
        />
        <Table
          columns={columns}
          rowKey="id"
          {...tableProps}
          bordered
          scroll={{ x: 'max-content' }}
        />
        <CreateLanguageContent
          projectId={projectId}
          languages={languages}
          platforms={platforms}
          editDetail={editDetail}
          visible={!!editDetail}
          onOk={() => {
            setEditDetail(null);
            search.submit();
          }}
          onCancel={() => {
            setEditDetail(null);
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({
  languages: global.languages,
  projectId: global.projectId,
  platforms: global.platforms,
}))(Language);

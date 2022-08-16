import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Modal, Message, Space, Button, message } from 'antd';
import api, { APIFilter, API_LANGUAGE } from '@/api';

const CreateLanguageContent = ({
  projectId,
  visible,
  onCancel,
  onOk,
  platforms,
  editDetail,
  languages = [],
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    if (visible && editDetail) {
      form.setFieldsValue({
        ...editDetail,
        platform_ids: editDetail?.Platforms?.map((item) => item.id) || [],
      });
    }
  }, [visible]);

  return (
    <Modal
      maskClosable={false}
      title={!editDetail ? '新增翻译' : '编辑翻译'}
      destroyOnClose
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      width={880}
      confirmLoading={confirmLoading}
      footer={
        <Space>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const enus = form.getFieldsValue().enus;
              console.log(enus);
              if (enus) {
                API_LANGUAGE.post('translate', '', {
                  project_id: projectId,
                  en: enus,
                })
                  .then(APIFilter)
                  .then((data) => {
                    form.setFieldsValue({
                      ...data,
                    });
                  });
              } else {
                Message.error('请先输入英语');
              }

              // onCancel();
            }}
          >
            一键翻译
          </Button>
          {!editDetail ? (
            <Button
              type="primary"
              onClick={() => {
                form.validateFields().then((values) => {
                  const obj = { ...values };
                  delete obj.platform_ids;
                  delete obj.key;
                  setConfirmLoading(true);
                  API_LANGUAGE.post('translation.manager', '', {
                    project_id: projectId,
                    id: editDetail?.id,
                    key: values.key,
                    platform_ids: values.platform_ids,

                    translation: {
                      ...obj,
                    },
                  })
                    .then(APIFilter)
                    .then((e) => {
                      setConfirmLoading(false);
                      Message.success('操作成功，请填写下一个');
                      form.resetFields();
                    })
                    .catch((e) => {
                      setConfirmLoading(false);
                    });
                });
              }}
            >
              下一个
            </Button>
          ) : null}
          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                setConfirmLoading(true);
                const obj = { ...values };
                delete obj.platform_ids;
                delete obj.key;
                API_LANGUAGE.post('translation.manager', '', {
                  project_id: projectId,
                  id: editDetail?.id,
                  key: values.key,
                  platform_ids: values.platform_ids,

                  translation: {
                    ...obj,
                  },
                })
                  .then(APIFilter)
                  .then((e) => {
                    setConfirmLoading(false);
                    Message.success('操作成功');
                    onOk();
                  })
                  .catch((e) => {
                    setConfirmLoading(false);
                  });
              });
            }}
          >
            确定
          </Button>
        </Space>
      }
    >
      <div style={{ maxHeight: '50vh', overflow: 'auto' }}>
        <Form {...layout} preserve={false} form={form} autoComplete="off">
          <Form.Item label="key" name="key" rules={[{ required: true, message: '不能为空' }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="操作系统"
            name="platform_ids"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Select
              fieldNames={{ label: 'code', value: 'id' }}
              options={platforms}
              placeholder="请选择"
              allowClear
              mode="multiple"
            />
          </Form.Item>
          {languages?.map((item) => {
            return (
              <Form.Item
                key={item.name}
                label={item.name}
                name={item.field}
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input.TextArea placeholder="请输入" />
              </Form.Item>
            );
          })}
        </Form>
      </div>
    </Modal>
  );
};

export default CreateLanguageContent;

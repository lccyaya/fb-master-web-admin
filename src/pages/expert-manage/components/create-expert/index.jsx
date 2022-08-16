import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Modal, Radio, Message, Button, Space } from 'antd';
import api, { APIFilter, API_SPORT } from '@/api';
import UploadImage from '@/components/upload-image';

const { Option } = Select;

const CreateExpert = ({ visible, onCancel, onOk, detail }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  useEffect(() => {
    if (visible && detail) {
      form.setFieldsValue({
        ...detail,
      });
    } else if (visible && !detail) {
      form.setFieldsValue({
        nickname: '',
        avatar: '',
        introduce: '',
      });
    }
  }, [visible]);
  return (
    <Modal
      maskClosable={false}
      title={!detail?.id ? '新增专家' : '编辑专家'}
      destroyOnClose
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
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
              form.validateFields().then((value) => {
                const { nickname, avatar, introduce } = value;
                setConfirmLoading(true);
                API_SPORT.post('expert', '', {
                  id: detail?.id || detail?.ID,
                  nickname,
                  avatar,
                  introduce,
                })
                  .then(APIFilter)
                  .then((e) => {
                    Message.success('操作成功');
                    onOk();
                  })
                  .finally(() => {
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
      <div>
        <Form {...layout} preserve={false} form={form} autoComplete="off">
          <Form.Item
            label="专家昵称"
            name="nickname"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="头像"
            name="avatar"
            rules={[{ required: true, message: '不能为空' }]}
            valuePropName={'fileList'}
          >
            <UploadImage />
          </Form.Item>
          <Form.Item
            label="简介"
            name="introduce"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateExpert;

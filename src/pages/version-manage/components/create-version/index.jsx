import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Modal, Radio, Message, Button, Space } from 'antd';
import PlatformSelect from '@/components/form/paltform-select';
import api, { APIFilter, API_SPORT, API_LANGUAGE } from '@/api';
import { PLATFORM } from '@/constant';

const { Option } = Select;

const CreateVersion = ({ visible, onCancel, onOk, detail, languages, projectName, projectId }) => {
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
        platform: PLATFORM.IOS,
        is_force: false,
        is_notice: false,
        project: 0,
      });
    }
  }, [visible]);
  console.log(languages);
  return (
    <Modal
      maskClosable={false}
      title={!detail?.id ? '新增版本' : '编辑版本'}
      destroyOnClose
      width={800}
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
              const enus = form.getFieldsValue().tips_en;
              // console.log(enus);
              if (enus) {
                API_LANGUAGE.post('translate', '', {
                  project_id: projectId,
                  en: enus,
                })
                  .then(APIFilter)
                  .then((data) => {
                    const obj = {};
                    for (let key in data) {
                      obj['tips_' + key.split('-')[0]] = data[key];
                    }
                    form.setFieldsValue({
                      ...obj,
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

          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then((value) => {
                const { platform, is_notice, version, is_force, download_link, project } = value;

                setConfirmLoading(true);
                const apiUrl = detail?.id ? 'upgrade.edit' : 'upgrade.create';
                let fun = API_SPORT;
                if (projectName === '007') {
                  fun = API_SPORT;
                } else {
                  fun = api;
                }
                fun
                  .post(apiUrl, '', {
                    ...value,
                    id: detail?.id,
                    platform,
                    is_notice,
                    version,
                    is_force,
                    download_link,
                    project,
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
      <div style={{ height: 600, overflow: 'auto' }}>
        <Form {...layout} preserve={false} form={form} autoComplete="off">
          <Form.Item label="类型" name="platform" rules={[{ required: true, message: '不能为空' }]}>
            <PlatformSelect />
          </Form.Item>
          <Form.Item
            label="版本号"
            name="version"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          {languages.map((item) => {
            return (
              <Form.Item label={item.name} name={`tips_${item.code.split('-')[0]}`}>
                <Input.TextArea placeholder="请输入" />
              </Form.Item>
            );
          })}

          <Form.Item
            label="下载链接"
            name="download_link"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="提示更新"
            name="is_notice"
            rules={[{ required: true, message: '不能为空' }]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValue, curValue) => {
              return prevValue.is_notice !== curValue.is_notice;
            }}
          >
            {() => {
              const is_notice = form.getFieldValue('is_notice');
              if (is_notice === true) {
                return (
                  <Form.Item
                    label="强制更新"
                    name="is_force"
                    rules={[{ required: true, message: '不能为空' }]}
                  >
                    <Radio.Group>
                      <Radio value={true}>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  </Form.Item>
                );
              } else {
                return null;
              }
            }}
          </Form.Item>
          {projectName === '007' ? (
            <Form.Item
              label="项目"
              name="project"
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Radio.Group>
                <Radio value={0}>国际</Radio>
                <Radio value={1}>国内</Radio>
              </Radio.Group>
            </Form.Item>
          ) : null}
        </Form>
      </div>
    </Modal>
  );
};

export default CreateVersion;

import { Modal, Form, Input, Button, DatePicker, Checkbox } from 'antd';
import { useIntl } from 'umi';
import { useEffect } from 'react';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const Edit = ({ visible, loading, onCancel = () => {}, onSuccess = () => {}, data, ...props }) => {
  const intl = useIntl();

  const platFormList = [
    {
      label: intl.formatMessage({ id: 'Official Site' }),
      value: 'web_link',
    },
    {
      label: 'iOS',
      value: 'ios_link',
    },
    {
      label: 'Android',
      value: 'android_link',
    },
  ];
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const onSubmit = () => {
    form.validateFields().then((values) => {
      const { platform, start_time, ...other } = values;
      const platformData = {};
      platFormList
        .map((item) => item.value)
        .forEach((item) => {
          platformData[item] = platform.includes(item);
        });
      onSuccess({
        ...other,
        start_time: moment(start_time).format('YYYY-MM-DD'),
        ...platformData,
      });
    });
  };
  useEffect(() => {
    if (visible) {
      if (data) {
        const { remark, start_time, name } = data;
        form.setFieldsValue({
          start_time: moment(start_time),
          name,
          remark,
          platform: [],
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, data]);
  return (
    <Modal
      visible={visible}
      width={600}
      {...props}
      onCancel={onCancel}
      initialValues={data}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ marginRight: 16 }}
            onClick={() => {
              onSubmit();
            }}
            loading={loading}
          >
            {intl.formatMessage({ id: 'Confirm' })}
          </Button>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>
        </div>
      }
    >
      <Form {...layout} preserve={false} form={form} autoComplete="off">
        <Form.Item
          label={intl.formatMessage({ id: 'Channel Name' })}
          name="name"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Please enter' })} />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'Remark' })} name="remark">
          <Input placeholder={intl.formatMessage({ id: 'Please enter' })} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'Running Date' })}
          name="start_time"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
          initialValue={moment()}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'Platform' })}
          name="platform"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
          initialValue={['web_link', 'ios_link', 'android_link']}
        >
          <CheckboxGroup options={platFormList} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;

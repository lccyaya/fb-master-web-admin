import {
  Drawer,
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  InputNumber,
  DatePicker,
  Select,
} from 'antd';
import { useIntl } from 'umi';
import { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import UploadImage from '@/components/upload-image';
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
import { PROJECT, BANNER_POSITION_007_MOBILE, BANNER_POSITION_007_PC } from '@/constant';

const Edit = ({
  visible,
  onCancel = () => {},
  onSuccess = () => {},
  popType,
  type,
  data,
  isEdit,
  formType,
  loading,
  ...props
}) => {
  const intl = useIntl();

  const POPUPS_FREQUENCY = [
    { label: intl.formatMessage({ id: 'Only First Enter' }), value: 0 },
    { label: intl.formatMessage({ id: 'Everyday Once' }), value: 1 },
    { label: intl.formatMessage({ id: 'Every Switch' }), value: 2 },
  ];

  const [form] = Form.useForm();
  const [imageType, setImageType] = useState('link');
  const onSubmit = () => {
    form.validateFields().then((values) => {
      const { position, time, radio, ...other } = values;
      const [begin_at, end_at] = time;
      onSuccess({
        ...other,
        position: position && position.join(','),
        begin_at: Math.floor(moment(begin_at).valueOf() / 1000),
        end_at: Math.floor(moment(end_at).valueOf() / 1000),
      });
    });
  };
  useEffect(() => {
    if (visible) {
      if (data) {
        const {
          img_url,
          landing_page,
          name,
          position,
          priority,
          project,
          skip_seconds,
          begin_at,
          end_at,
          frequency,
        } = data;
        form.setFieldsValue({
          img_url,
          landing_page,
          name,
          position: position && position.split(','),
          priority,
          project,
          skip_seconds,
          time: [moment(begin_at * 1000), moment(end_at * 1000)],
          frequency,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, data]);
  const projectList = useMemo(() => {
    return (
      Object.keys(PROJECT)
        .filter((item) => isNaN(item))
        .map((item) => {
          return {
            label: intl.formatMessage({ id: PROJECT[PROJECT[item]] }),
            value: PROJECT[item],
          };
        }) || []
    );
  }, [PROJECT]);
  const positionList = useMemo(() => {
    const list = formType === 'web_pop' ? BANNER_POSITION_007_PC : BANNER_POSITION_007_MOBILE;
    return (
      Object.keys(list)
        .filter((item) => isNaN(item))
        .map((item) => {
          return {
            label: list[list[item]],
            value: list[item],
          };
        })
        .filter((e) => e.label) || []
    );
  }, [BANNER_POSITION_007_MOBILE, BANNER_POSITION_007_PC, formType]);
  const isPop = useMemo(() => {
    return formType && formType.includes('pop');
  }, [formType]);
  return (
    <Drawer
      visible={visible}
      width={600}
      {...props}
      onClose={onCancel}
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
      <Form layout="vertical" preserve={false} form={form} autoComplete="off">
        <Form.Item
          label={intl.formatMessage({ id: 'Activity Name' })}
          name="name"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Activity Name' })} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'Time' })}
          name="time"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <RangePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'Image' })}
          name="radio"
          tooltip="请输入链接地址，图片比例750*320(移动端：750*320；Web端：680*120)"
          initialValue="link"
        >
          <Radio.Group
            onChange={(e) => {
              setImageType(e.target.value);
            }}
          >
            <Radio value="link">{intl.formatMessage({ id: 'Link' })}</Radio>
            <Radio value="upload">{intl.formatMessage({ id: 'Upload' })}</Radio>
          </Radio.Group>
        </Form.Item>
        {imageType === 'link' ? (
          <Form.Item
            name="img_url"
            rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
          >
            <Input placeholder={intl.formatMessage({ id: 'Please enter' })} />
          </Form.Item>
        ) : (
          <Form.Item
            name="img_url"
            valuePropName={'fileList'}
            rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
          >
            <UploadImage project="007" btnText={intl.formatMessage({ id: 'Click to upload' })} />
          </Form.Item>
        )}

        <Form.Item
          label={intl.formatMessage({ id: 'Landing Page Url' })}
          name="landing_page"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Please enter' })} />
        </Form.Item>
        {popType === 'banners' ? (
          <>
            <Form.Item
              label={intl.formatMessage({ id: 'Priority' })}
              name="priority"
              rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
            >
              <InputNumber
                placeholder={intl.formatMessage({ id: 'Please enter' })}
                style={{ width: '100%' }}
              />
            </Form.Item>
            {formType === 'flash' ? (
              <Form.Item
                label={intl.formatMessage({ id: 'Skip' })}
                name="skip_seconds"
                rules={[
                  { required: true, message: intl.formatMessage({ id: 'This is required' }) },
                ]}
              >
                <InputNumber
                  placeholder={intl.formatMessage({ id: 'Skip seconds' })}
                  style={{ width: '100%' }}
                  parser={(text) => (/^\d+$/.test(text) ? text : 0)}
                />
              </Form.Item>
            ) : null}
          </>
        ) : isPop ? (
          <>
            <Form.Item
              label={intl.formatMessage({ id: 'Display Page' })}
              name="position"
              rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
            >
              <CheckboxGroup options={positionList} />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({ id: 'Display Frequency' })}
              name="frequency"
              rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
            >
              <Select
                options={POPUPS_FREQUENCY}
                placeholder={intl.formatMessage({ id: 'Please select' })}
              />
            </Form.Item>
          </>
        ) : null}

        <Form.Item
          label={intl.formatMessage({ id: 'Project' })}
          name="project"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
          initialValue={0}
        >
          <Radio.Group>
            {projectList.map((item) => {
              return (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Edit;

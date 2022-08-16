import { Modal, Form, Input, Button, Radio, InputNumber } from 'antd';
import { useIntl } from 'umi';
import { useEffect } from 'react';
import moment from 'moment';
import { ODD_TYPE } from '@/constant';
const Edit = ({ visible, loading, onCancel = () => {}, onSuccess = () => {}, data, ...props }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const onSubmit = () => {
    form.validateFields().then((values) => {
      onSuccess({ ...values, match_id: data.match_id });
    });
  };
  useEffect(() => {
    if (visible) {
      const {
        match_time,
        competition_name,
        home_team_name,
        away_team_name,
        odds_type,
        confidence,
      } = data;
      form.setFieldsValue({
        match_time: moment(match_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
        competition_name,
        confidence,
        team: `${home_team_name} vs ${away_team_name}`,
        odds_type,
      });
    }
  }, [visible]);
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
            loading={loading}
            onClick={() => {
              onSubmit();
            }}
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
        <Form.Item label={intl.formatMessage({ id: 'Match Time' })} name="match_time">
          <Input disabled />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'Competition' })} name="competition_name">
          <Input disabled />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'Team' })} name="team">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'Tips' })}
          name="odds_type"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <Radio.Group
            options={[
              {
                label: `${intl.formatMessage({ id: 'Home' })}: ${
                  data.odds && data.odds.asia && data.odds.asia.home
                    ? data.odds.asia.home > 0
                      ? `+${data.odds.asia.home}`
                      : data.odds.asia.home
                    : ''
                }`,
                value: ODD_TYPE.HOME,
              },
              {
                label: `${intl.formatMessage({ id: 'Handicap' })}: ${
                  data.odds && data.odds.asia && data.odds.asia.draw
                    ? data.odds.asia.draw > 0
                      ? `+${data.odds.asia.draw}`
                      : data.odds.asia.draw
                    : ''
                }`,
                value: ODD_TYPE.DRAW,
                disabled: true,
              },
              {
                label: `${intl.formatMessage({ id: 'Away' })}: ${
                  data.odds && data.odds.asia && data.odds.asia.away
                    ? data.odds.asia.away > 0
                      ? `+${data.odds.asia.away}`
                      : data.odds.asia.away
                    : ''
                }`,
                value: ODD_TYPE.AWAY,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'Confidence' })}
          name="confidence"
          rules={[{ required: true, message: intl.formatMessage({ id: 'This is required' }) }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              id: 'Please enter an integer multiple of 0.25, the maximum is 5',
            })}
            max={5}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;

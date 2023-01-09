import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Input, Form, DatePicker } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import ConstantSelect from '@/components/form/constant-select';
import { PROJECT, ACTIVATE_APP, REGISTER_PLATFORM } from '@/constant';
import moment from 'moment';
import { APIFilter, API_SPORT } from '@/api';
import { connect, useIntl } from 'umi';
import { useEffect } from 'react';

const UserManage = ({ }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const columns = [
    {
      search: false,
      title: intl.formatMessage({ id: 'User ID' }),
      dataIndex: 'id',
      render: (_, record) => {
        return <div>
          {record.register_platform}{record.channels}
          {moment(record.created_at).format('YYMMDDHHmm')}{_.toString().padStart(3, '0')}
        </div>
      },
    },
    {
      title: intl.formatMessage({ id: 'Project' }),
      dataIndex: 'project',
      fieldProps: { allowClear: false },
      key: 'project',
      render: (_, record) => {
        return intl.formatMessage({ id: record.project ? 'key_china' : 'key_international' });
      },
    },
    {
      title: intl.formatMessage({ id: 'Username' }),
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: intl.formatMessage({ id: 'Phonenumber' }),
      dataIndex: 'openid',
      key: 'openid',
    },
    {
      title: intl.formatMessage({ id: 'First open time' }),
      dataIndex: 'first_open_time',
      key: 'first_open_time',
      render: (value) => {
        return moment(value).format('YYYY.MM.DD HH:mm')
      },
    },
    // {
    //   title: intl.formatMessage({ id: 'Email' }),
    //   dataIndex: 'bind_email',
    //   key: 'bind_email',
    // },


    {
      search: false,
      title: intl.formatMessage({ id: 'Registration time' }),
      render: (_, record) => {
        return moment(record.created_at).format('YYYY.MM.DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'Register source' }),
      dataIndex: 'register_platform',
      key: 'register_platform',
      valueType: 'select',
      valueEnum: {
        H5: { text: 'H5' },
        PC: { text: 'PC' },
        iOS: { text: 'iOS' },
        Android: { text: 'Android' },
      },
    },
    {
      title: intl.formatMessage({ id: 'Registration channels' }),
      dataIndex: 'channels',
      key: 'channels',
    },
    {
      title: intl.formatMessage({ id: 'Activate the APP' }),
      render: (_, record) => {
        return intl.formatMessage({ id: record.activate_app ? 'yes' : 'no' });
      },
      key: 'activate_app',
      valueType: 'select',
      valueEnum: {
        1: { text: intl.formatMessage({ id: 'yes' }) },
        0: { text: intl.formatMessage({ id: 'no' }) },
      },
    },
    {
      title: intl.formatMessage({ id: 'Active days' }),
      search: false,
      dataIndex: 'activate_days',
    },
    {
      title: intl.formatMessage({ id: 'Recharge' }),
      search: false,
      dataIndex: 'charge',
    },
    {
      title: intl.formatMessage({ id: 'Expense' }),
      search: false,
      dataIndex: 'consumption',
    },
    {
      title: intl.formatMessage({ id: 'Balance' }),
      search: false,
      dataIndex: 'coin',
    },
    {
      title: intl.formatMessage({ id: 'Affiliated person' }),
      search: false,
      dataIndex: 'associated_user',
    },

    {
      title: intl.formatMessage({ id: 'Last login time' }),
      search: false,
      render: (_, record) => {
        return moment(record.last_login_time).format('YYYY.MM.DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'Last login source' }),
      search: false,
      dataIndex: 'last_login_platform',
    },
    {
      title: intl.formatMessage({ id: 'Current version number' }),
      search: false,
      dataIndex: 'last_app_version',
    },
    {
      title: intl.formatMessage({ id: 'Status' }),
      search: false,
      dataIndex: 'state',
      render: (_, record) => {
        return "正常"
      },
    },
  ].filter((e) => e);
  const getUserList = (
    { current, pageSize = 10 },
    { name, register_platform, activate_app, phone, channels, registration_time, last_login_source_time },
  ) => {

    const datarender = (date) => {
      return date && moment(moment(date).format('YYYY-MM-DD')).valueOf() / 1000;
    };
    return API_SPORT.get('usersInfo', '', {

      page: current,
      size: pageSize,
      // project,
      name,
      phone,
      // email,
      register_platform,
      channels,
      activate_app,
      register_time_begin: registration_time && datarender(registration_time[0]),
      register_time_end: registration_time && datarender(registration_time[1]),
      last_login_time_begin: last_login_source_time && datarender(last_login_source_time[0]),
      last_login_time_end: last_login_source_time && datarender(last_login_source_time[1])
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.users,
          total: e?.total,
        };
      });
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getUserList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  useEffect(() => {
    search?.reset();
  }, []);
  return (
    <PageContainer>
      <Card>
        <Search
          refresh={refresh}
          form={form}
          submit={search?.submit}
          reset={search?.reset}
          nodes={[
            // {
            //   label: intl.formatMessage({ id: 'Project' }),
            //   name: 'project',
            //   node: <ConstantSelect constant={PROJECT} noAll={true} />,
            // },
            {
              label: intl.formatMessage({ id: 'Username' }),
              name: 'name',
              node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            },
            {
              label: intl.formatMessage({ id: 'Phonenumber' }),
              name: 'phone',
              node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            },
            // {
            //   label: intl.formatMessage({ id: 'Email' }),
            //   name: 'email',
            //   node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            // },
            {
              label: intl.formatMessage({ id: 'Register source' }),
              name: 'register_platform',
              node: <ConstantSelect constant={REGISTER_PLATFORM} noAll={true} />,
            },
            {
              label: intl.formatMessage({ id: 'Registration channels' }),
              name: 'channels',
              // node: <ConstantSelect constant={REGISTER_PLATFORM} noAll={true} />,
              node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            },
            {
              label: intl.formatMessage({ id: 'Activate the APP' }),
              name: 'activate_app',
              node: <ConstantSelect constant={ACTIVATE_APP} noAll={true} />,
            },
            {
              label: intl.formatMessage({ id: 'Registration time' }),
              name: 'registration_time',
              node: <RangePicker showTime={false} />,
            },
            {
              label: intl.formatMessage({ id: 'Last login source' }),
              name: 'last_login_source_time',
              node: <RangePicker showTime={false} />,
            },
            // {
            //   label: intl.formatMessage({ id: 'Activate the APP' }),
            //   name: 'activate_app',
            //   node: <RangePicker showTime={false} />,
            // },
          ]}
        />
        <Table
          bordered
          columns={columns}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          {...tableProps}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({}))(UserManage);

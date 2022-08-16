import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Input, Form } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import ConstantSelect from '@/components/form/constant-select';
import { PROJECT, ACTIVATE_APP, REGISTER_PLATFORM } from '@/constant';
import moment from 'moment';
import { APIFilter, API_SPORT } from '@/api';
import { connect, useIntl } from 'umi';
import { useEffect } from 'react';

const UserManage = ({}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const columns = [
    {
      search: false,
      title: 'ID',
      dataIndex: 'ID',
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
      dataIndex: 'Nickname',
      key: 'Nickname',
    },
    {
      title: intl.formatMessage({ id: 'Email' }),
      dataIndex: 'bind_email',
      key: 'bind_email',
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
      search: false,
      title: intl.formatMessage({ id: 'Registration time' }),
      render: (_, record) => {
        return moment(record.CreatedAt).format('YYYY.MM.DD HH:mm');
      },
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
  ].filter((e) => e);
  const getUserList = (
    { current, pageSize = 10 },
    { project, name, email, register_platform, activate_app },
  ) => {
    return API_SPORT.get('users', '', {
      page: current,
      size: pageSize,
      project,
      name,
      email,
      register_platform,
      activate_app,
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
            {
              label: intl.formatMessage({ id: 'Project' }),
              name: 'project',
              node: <ConstantSelect constant={PROJECT} noAll={true} />,
            },
            {
              label: intl.formatMessage({ id: 'Username' }),
              name: 'name',
              node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            },
            {
              label: intl.formatMessage({ id: 'Email' }),
              name: 'email',
              node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} allowClear />,
            },
            {
              label: intl.formatMessage({ id: 'Register source' }),
              name: 'register_platform',
              node: <ConstantSelect constant={REGISTER_PLATFORM} noAll={true} />,
            },
            {
              label: intl.formatMessage({ id: 'Activate the APP' }),
              name: 'activate_app',
              node: <ConstantSelect constant={ACTIVATE_APP} noAll={true} />,
            },
          ]}
        />
        <Table
          bordered
          columns={columns}
          rowKey="ID"
          scroll={{ x: 'max-content' }}
          {...tableProps}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ global }) => ({}))(UserManage);

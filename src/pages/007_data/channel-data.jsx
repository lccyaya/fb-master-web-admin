import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import moment from 'moment';
import { message, Input, Button, Table, DatePicker, Form } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import Edit from './edit';
const { RangePicker } = DatePicker;
const ChannelData = () => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(null);
  const intl = useIntl();
  const columns = [
    {
      title: intl.formatMessage({ id: 'Channel Name' }),
      dataIndex: 'keywords',
      copyable: true,
      ellipsis: true,
      render: (_, record) => {
        return record.promotion_channel.name;
      },
    },
    {
      title: intl.formatMessage({ id: 'Official Site Link' }),
      search: false,
      copyable: true,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'web');
        return link?.promotion_link || '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Click Count' }),
      search: false,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'web');
        return link?.visit_count ?? '-';
      },
    },
    {
      title: <span>iOS {intl.formatMessage({ id: 'Download Link' })}</span>,
      search: false,
      copyable: true,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'ios');
        return link?.promotion_link || '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Click Count' }),
      search: false,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'ios');
        return link?.visit_count ?? '-';
      },
    },
    {
      title: <span>Android {intl.formatMessage({ id: 'Download Link' })}</span>,
      search: false,
      copyable: true,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'android');
        return link?.promotion_link || '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Click Count' }),
      search: false,
      render: (_, record) => {
        const link = record.code_data.find((c) => c.platform === 'android');
        return link?.visit_count ?? '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Running Date' }),
      search: false,
      render: (_, record) => {
        return moment(new Date(record.promotion_channel.start_time)).format('YYYY-MM-DD');
      },
    },
    {
      title: intl.formatMessage({ id: 'Remark' }),
      key: 'remark',
      search: false,
      render: (_, record) => {
        return record.promotion_channel.remark || '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Operations' }),
      valueType: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setIsEdit(true);
            setRecord(record?.promotion_channel);
            setVisible(true);
          }}
        >
          {intl.formatMessage({ id: 'Edit' })}
        </a>,
      ],
    },
  ];
  const onSuccess = (values) => {
    setLoading(true);
    const url = isEdit ? 'promotion_channel.edit' : 'promotion_channel.create';
    const params = isEdit
      ? {
          ...values,
          id: record.ID,
        }
      : values;
    API_SPORT.post(url, '', params)
      .then(APIFilter)
      .then((e) => {
        setLoading(false);
        setVisible(false);
        setRecord(null);
        search?.reset();
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const getList = ({ current, pageSize = 10 }, { time = [], keywords }) => {
    const [start_time, end_time] = time;

    return API_SPORT.post('promotion_channel.list', '', {
      page: current,
      size: pageSize,
      start_time: start_time && moment(start_time).format('YYYY-MM-DD'),
      end_time: end_time && moment(end_time).format('YYYY-MM-DD'),
      keywords,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.resp,
          total: e?.total,
        };
      });
  };
  const { tableProps, search, refreshAsync, refresh } = useAntdTable(getList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  useEffect(() => {
    search?.reset();
  }, []);
  return (
    <>
      <Search
        refresh={refresh}
        form={form}
        submit={search?.submit}
        reset={search?.reset}
        nodes={[
          {
            label: intl.formatMessage({ id: 'Channel Name' }),
            name: 'keywords',
            node: <Input placeholder={intl.formatMessage({ id: 'Please enter' })} />,
          },
          {
            label: intl.formatMessage({ id: 'Statistical time period' }),
            name: 'time',
            node: <RangePicker showTime={false} />,
          },
        ]}
      />
      <div style={{ textAlign: 'right', margin: '20px 0' }}>
        <Button
          type="primary"
          onClick={() => {
            setRecord(null);
            setIsEdit(false);
            setVisible(true);
          }}
        >
          {intl.formatMessage({ id: 'New' })}
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        rowKey="match_id"
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
      <Edit
        visible={visible}
        loading={loading}
        title={
          isEdit
            ? intl.formatMessage({ id: 'Edit Channel' })
            : intl.formatMessage({ id: 'New Channel' })
        }
        data={record}
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
      />
    </>
  );
};
export default ChannelData;

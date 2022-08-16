import { Table, Form, Image, Button, message } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import { APIFilter, API_SPORT } from '@/api';
import ConstantSelect from '@/components/form/constant-select';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';
import { PROJECT, BANNER_POPUPS_STATUS, BANNER_TYPE_007 } from '@/constant';
import moment from 'moment';
import Edit from './edit';

const Banners = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const mobileList = ['home1', 'headline', 'flash', 'tips1', 'match1'];
  const position = form.getFieldValue('position');
  const columns = [
    {
      title: intl.formatMessage({ id: 'Activity Name' }),
      dataIndex: 'name',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: intl.formatMessage({ id: 'Project' }),
      dataIndex: 'project',
      key: 'project',
      render: (_) => {
        return [
          intl.formatMessage({ id: 'key_international' }),
          intl.formatMessage({ id: 'china' }),
        ][_];
      },
    },
    position === 'flash'
      ? {
          title: 'skip',
          dataIndex: 'skip_seconds',
          key: 'skip_seconds',
        }
      : null,
    {
      title: intl.formatMessage({ id: 'Start Time' }),
      width: 140,
      key: 'begin_at',
      dataIndex: 'begin_at',
      render: (text) => moment(new Date(+text * 1000)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({ id: 'End Time' }),
      width: 140,
      key: 'end_at',
      dataIndex: 'end_at',
      render: (text) => moment(new Date(+text * 1000)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({ id: 'Priority' }),
      key: 'priority',
      dataIndex: 'priority',
    },
    {
      title: intl.formatMessage({ id: 'Image Preview' }),
      dataIndex: 'img_url',
      key: 'img_url',
      render: (_) => {
        return _ ? <Image src={_} width={100} height={50} /> : null;
      },
    },
    {
      title: intl.formatMessage({ id: 'Link Address' }),
      width: 140,
      dataIndex: 'landing_page',
      key: 'landing_page',
    },
    {
      title: intl.formatMessage({ id: 'Operation' }),
      key: 'option',
      width: 120,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setRecord(record);
            setIsEdit(true);
            setVisible(true);
          }}
        >
          {intl.formatMessage({ id: 'Edit' })}
        </a>,
      ],
    },
  ];
  const fetchList = ({ current, pageSize = 10 }, { position, project, status }) => {
    const platform = mobileList.includes(position) ? 0 : 1;
    return API_SPORT.get('banners', '', {
      page: current,
      size: pageSize,
      position,
      project,
      platform,
      status,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.banners,
          total: e?.total,
        };
      });
  };
  const { tableProps, search, refresh } = useAntdTable(fetchList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  const onSuccess = (values) => {
    const platform = mobileList.includes(position) ? 0 : 1;
    const { banner_id, status } = record || {};
    const params = isEdit
      ? {
          ...values,
          platform,
          id: banner_id,
          status,
          position,
          platform,
        }
      : { ...values, id: 0, position, platform, status: 1 };
    setLoading(true);
    API_SPORT.post('banner', '', params)
      .then(APIFilter)
      .then((resp) => {
        setVisible(false);
        setRecord(null);
        message.success(
          isEdit
            ? intl.formatMessage({ id: 'Modify success' })
            : intl.formatMessage({ id: 'Add success' }),
        );
        setLoading(false);
        setTimeout(() => {
          search.reset();
        }, 500);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

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
        initialValues={{ position: 'home1', status: 1, project: 0 }}
        nodes={[
          {
            label: intl.formatMessage({ id: 'Type' }),
            name: 'position',
            node: <ConstantSelect constant={BANNER_TYPE_007} noAll={true} allowClear={false} />,
          },
          {
            label: intl.formatMessage({ id: 'Project' }),
            name: 'project',
            node: <ConstantSelect constant={PROJECT} noAll={true} allowClear={false} />,
          },
          {
            label: intl.formatMessage({ id: 'Status' }),
            name: 'status',
            node: (
              <ConstantSelect constant={BANNER_POPUPS_STATUS} noAll={true} allowClear={false} />
            ),
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
        rowKey="banner_id"
        columns={columns.filter((e) => e)}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
      <Edit
        visible={visible}
        popType="banners"
        data={record}
        isEdit={isEdit}
        formType={position}
        title={
          isEdit
            ? intl.formatMessage({ id: 'Edit' }) +
              ` ${position && intl.formatMessage({ id: BANNER_TYPE_007[position] })}`
            : intl.formatMessage({ id: 'New' }) +
              ` ${position && intl.formatMessage({ id: BANNER_TYPE_007[position] })}`
        }
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
        loading={loading}
      />
    </>
  );
};
export default Banners;

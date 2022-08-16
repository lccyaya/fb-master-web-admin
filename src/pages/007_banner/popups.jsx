import { Table, Form, Image, Button } from 'antd';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import { APIFilter, API_SPORT } from '@/api';
import ConstantSelect from '@/components/form/constant-select';
import { useIntl } from 'umi';
import { useEffect, useMemo, useState } from 'react';
import {
  PROJECT,
  BANNER_POPUPS_STATUS,
  POPUPS_TYPE_007,
  BANNER_POSITION_007_PC,
  BANNER_POSITION_007_MOBILE,
} from '@/constant';
import moment from 'moment';
import Edit from './edit';

const Popups = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const type = form.getFieldValue('type');
  const showPosition = type !== 'floating';
  const mobileList = ['pop', 'floating'];
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
          intl.formatMessage({ id: 'key_china' }),
        ][_];
      },
    },
    showPosition
      ? {
          title: intl.formatMessage({ id: 'Display Frequency' }),
          dataIndex: 'frequency',
          render: (e) => {
            const label = [
              intl.formatMessage({ id: 'Only First Enter' }),
              intl.formatMessage({ id: 'Everyday Once' }),
              intl.formatMessage({ id: 'Every Switch' }),
            ];
            return <span>{label[`${e}`]}</span>;
          },
          key: 'frequency',
        }
      : null,
    showPosition
      ? {
          title: intl.formatMessage({ id: 'Display Page' }),
          dataIndex: 'position',
          key: 'position',
          render: (e) => {
            if (e.includes('home')) {
              return 'Home';
            }
            if (e.includes('detail')) {
              return 'Details';
            }
            if (e.includes('tips')) {
              return 'Tips';
            }
            if (e.includes('info')) {
              return 'Info';
            }
            if (e.includes('me')) {
              return 'Me';
            }
            return e;
          },
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
    // {
    //   title: intl.formatMessage({ id: 'Priority' }),
    //   key: 'priority',
    //   dataIndex: 'priority',
    // },
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
  const fetchList = ({ current, pageSize = 10 }, { project, status, type, position }) => {
    const params = {
      type: type === 'web_pop' ? 'pop' : type,
      platform: type === 'web_pop' ? 1 : 0,
    };
    return API_SPORT.get('popups', '', {
      page: current,
      size: pageSize,
      position:
        position ||
        (type === 'web_pop'
          ? 'pophome2,popdetail2,popinfo2,poptips2,popme2'
          : 'pophome1,popdetail1,popinfo1,poptips1,popme1'),
      project,
      status,
      ...params,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e?.popups,
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
    setLoading(true);
    const platform = mobileList.includes(type) ? 0 : 1;
    const params = isEdit
      ? {
          ...values,
          status: form.getFieldValue('status'),
          id: record.id,
          platform,
          type: type === 'web_pop' ? 'pop' : type,
        }
      : { ...values, id: 0, status: 1, platform, type: type === 'web_pop' ? 'pop' : type };
    API_SPORT.post('popup', '', params)
      .then(APIFilter)
      .then((resp) => {
        search.reset();
        setVisible(false);
        setRecord(null);
        message.success(
          isEdit
            ? intl.formatMessage({ id: 'Modify success' })
            : intl.formatMessage({ id: 'Add success' }),
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const searchNodes = useMemo(() => {
    const defaultNodes = [
      {
        label: intl.formatMessage({ id: 'Type' }),
        name: 'type',
        node: <ConstantSelect constant={POPUPS_TYPE_007} noAll={true} allowClear={false} />,
      },
      {
        label: intl.formatMessage({ id: 'Project' }),
        name: 'project',
        node: <ConstantSelect constant={PROJECT} noAll={true} allowClear={false} />,
      },
      {
        label: intl.formatMessage({ id: 'Status' }),
        name: 'status',
        node: <ConstantSelect constant={BANNER_POPUPS_STATUS} noAll={true} allowClear={false} />,
      },
    ];
    return defaultNodes;
    // return showPosition
    //   ? [
    //       ...defaultNodes,
    //       {
    //         label: intl.formatMessage({ id: 'Position' }),
    //         name: 'position',
    //         node: (
    //           <ConstantSelect
    //             constant={type === 'web_pop' ? BANNER_POSITION_007_PC : BANNER_POSITION_007_MOBILE}
    //             noAll={true}
    //           />
    //         ),
    //       },
    //     ]
    //   : defaultNodes;
  }, []);
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
        initialValues={{ project: 0, status: 1, type: 'pop' }}
        nodes={searchNodes}
      />
      <div style={{ textAlign: 'right', margin: '20px 0' }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setRecord(null);
            setIsEdit(false);
          }}
        >
          {intl.formatMessage({ id: 'New' })}
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        columns={columns.filter((e) => e)}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
      <Edit
        visible={visible}
        popType="popups"
        data={record}
        isEdit={isEdit}
        formType={type}
        title={
          isEdit
            ? intl.formatMessage({ id: 'Edit' }) +
              ` ${type && intl.formatMessage({ id: POPUPS_TYPE_007[type] })}`
            : intl.formatMessage({ id: 'New' }) +
              ` ${type && intl.formatMessage({ id: POPUPS_TYPE_007[type] })}`
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
export default Popups;

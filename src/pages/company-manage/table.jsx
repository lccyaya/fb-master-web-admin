import { Table, Space, Spin, Input, Card } from 'antd';
import { useIntl } from 'umi';
import React, { useState, useMemo, useEffect } from 'react';

export default function DataTable({
  sortData = {},
  hotData = {},
  onHotCancel,
  onHotSet,
  onSortSet,
  loading,
  activeKey,
}) {
  const intl = useIntl();
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState(1);
  const onChange = (current) => {
    setCurrent(current);
  };
  const columns = [
    {
      title: intl.formatMessage({ id: 'Index' }),
      width: 80,
      dataIndex: '',
      render: (_, __, index) => index + 1 + (current - 1) * 10,
    },
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'Company Name' }),
      width: 80,
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'Operation' }),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_, record, index) => {
        return (
          <Space>
            <a
              onClick={() => {
                onHotCancel(record.id);
              }}
            >
              {intl.formatMessage({ id: 'Delete' })}
            </a>
            <a
              onClick={() => {
                onSortSet(record.id);
              }}
            >
              {intl.formatMessage({ id: 'MoveTop' })}
            </a>
          </Space>
        );
      },
    },
  ].filter((e) => e);
  const sortColumns = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'Company Name' }),
      width: 80,
      dataIndex: 'name',
    },

    {
      title: intl.formatMessage({ id: 'Operation' }),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a
              onClick={() => {
                onHotSet(record.id);
              }}
            >
              {intl.formatMessage({ id: 'Add' })}
            </a>
            <a
              onClick={() => {
                onSortSet(record.id);
              }}
            >
              {intl.formatMessage({ id: 'MoveTop' })}
            </a>
          </Space>
        );
      },
    },
  ].filter((e) => e);
  const _sortData = useMemo(() => {
    if (query) {
      return sortData.filter((i) => i.name.includes(query));
    }
    return sortData;
  }, [query, sortData]);
  useEffect(() => {
    setCurrent(1);
  }, [activeKey]);
  return (
    <Spin spinning={loading}>
      <Card
        title={intl.formatMessage({ id: 'Major Company' })}
        bordered={false}
        bodyStyle={{ padding: 0 }}
        headStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={hotData}
          pagination={{ current: current, onChange: onChange }}
        />
      </Card>
      <Card
        style={{ marginTop: '40px' }}
        title={intl.formatMessage({ id: 'All Company' })}
        bordered={false}
        bodyStyle={{ padding: 0 }}
        headStyle={{ padding: 0 }}
        extra={
          <Input.Search
            onSearch={(e) => {
              setQuery(e);
            }}
          />
        }
      >
        <Table columns={sortColumns} dataSource={_sortData} />
      </Card>
    </Spin>
  );
}

import React from 'react';
import { Select, Spin } from 'antd';
import api, { APIFilter } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange }) => {
  const fetchCoinList = ({ searchKey }) => {
    if (!searchKey) return Promise.resolve([]);
    return api
      .get('news.coins', '', {
        keywords: searchKey,
      })
      .then(APIFilter)
      .then((data) => {
        return data.list.map((item) => {
          return {
            label: item.symbol_show,
            value: item.symbol,
          };
        });
      });
  };
  const fetchCoinListRequest = useRequest(fetchCoinList, {
    debounceInterval: 300,
    manual: true,
  });
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      placeholder={'请输入'}
      allowClear
      style={{ width: 160 }}
      filterOption={false}
      notFoundContent={fetchCoinListRequest.loading ? <Spin size={'small'} /> : null}
      onSearch={(value) => fetchCoinListRequest.run({ searchKey: value })}
    >
      {(fetchCoinListRequest?.data || []).map((item) => {
        return (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default Index;

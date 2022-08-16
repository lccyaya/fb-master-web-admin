import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';
import api, { APIFilter } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange, width = 160, mode, symbols }) => {
  const fetchCoinList = ({ searchKey, symbols }) => {
    // if (!searchKey) return Promise.resolve([]);
    return api
      .get('coin.search', '', {
        keywords: searchKey,
        symbols,
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
  useEffect(() => {
    if (symbols?.filter((e) => e)?.length) {
      fetchCoinListRequest.run({ symbols: symbols.join(',') });
    }
  }, [symbols]);
  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      showSearch
      placeholder={'请输入'}
      allowClear
      style={{ width }}
      filterOption={false}
      notFoundContent={fetchCoinListRequest.loading ? <Spin size={'small'} /> : null}
      onSearch={(value) => fetchCoinListRequest.run({ searchKey: value, symbols })}
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

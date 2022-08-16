import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';
import api, { APIFilter } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange, width = 160, mode, symbols, disabled = false }) => {
  const fetchCategoryList = ({ searchKey }) => {
    return api
      .get('wiki.category', '', {
        page: 1,
        size: 20,
        title: searchKey,
      })
      .then(APIFilter)
      .then((data) => {
        return data.list.map((item) => {
          return {
            label: item.title,
            value: item.id,
          };
        });
      });
  };
  const fetchCategoryListRequest = useRequest(fetchCategoryList, {
    debounceInterval: 300,
    manual: true,
  });
  useEffect(() => {
    fetchCategoryListRequest.run({});
  }, []);
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
      notFoundContent={fetchCategoryListRequest.loading ? <Spin size={'small'} /> : null}
      onSearch={(value) => fetchCategoryListRequest.run({ searchKey: value, symbols })}
      disabled={disabled}
    >
      {(fetchCategoryListRequest?.data || []).map((item) => {
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

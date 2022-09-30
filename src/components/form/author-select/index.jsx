import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange, width = 160, mode, disabled = false }) => {
  const fetchAuthorList = ({ searchKey }) => {
    return API_SPORT.get('news.author', '', {
      page: 1,
      size: 20,
      nickname: searchKey,
    })
      .then(APIFilter)
      .then((data) => {
        return data.list.map((item) => {
          return {
            label: item.Nickname,
            value: item.id || item.ID,
          };
        });
      });
  };
  const fetchAuthorListRequest = useRequest(fetchAuthorList, {
    debounceInterval: 300,
    manual: true,
  });
  useEffect(() => {
    fetchAuthorListRequest.run({});
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
      notFoundContent={fetchAuthorListRequest.loading ? <Spin size={'small'} /> : null}
      onSearch={(value) => fetchAuthorListRequest.run({ searchKey: value })}
      disabled={disabled}
    >
      {(fetchAuthorListRequest?.data || []).map((item) => {
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

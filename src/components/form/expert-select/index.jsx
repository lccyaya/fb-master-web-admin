import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange, width = 160, mode, disabled = false }) => {
  const fetchExpertList = ({ searchKey }) => {
    return API_SPORT.get('expert.list', '', {
      page: 1,
      size: 20,
      nickname: searchKey,
    })
      .then(APIFilter)
      .then((data) => {
        return data.list.map((item) => {
          return {
            label: item.nickname,
            value: item.id || item.ID,
          };
        });
      });
  };
  const fetchExpertListRequest = useRequest(fetchExpertList, {
    debounceInterval: 300,
    manual: true,
  });
  useEffect(() => {
    fetchExpertListRequest.run({});
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
      notFoundContent={fetchExpertListRequest.loading ? <Spin size={'small'} /> : null}
      onSearch={(value) => fetchExpertListRequest.run({ searchKey: value })}
      disabled={disabled}
    >
      {(fetchExpertListRequest?.data || []).map((item) => {
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

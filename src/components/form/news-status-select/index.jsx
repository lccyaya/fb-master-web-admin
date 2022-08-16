import React, { useEffect } from 'react';
import { Select } from 'antd';
import { NEWS_STATUS } from '@/constant';

const Index = ({ onChange, value }) => {
  const options = [
    { label: '所有', value: -1 },
    ...Object.keys(NEWS_STATUS)
      .filter((e) => !isNaN(e))
      .map((key) => {
        key = key * 1;
        return { label: NEWS_STATUS[key], value: key };
      }),
  ];
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: 120 }}
      placeholder="请输入"
      allowClear
      options={options}
    ></Select>
  );
};

export default Index;

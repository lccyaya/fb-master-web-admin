import React, { useEffect } from 'react';
import { Select } from 'antd';

const Index = ({ onChange, value, platforms = [] }) => {
  console.log(platforms);
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: 120 }}
      placeholder="请输入"
      allowClear
      options={[
        { label: '所有', value: -1 },
        ...platforms.map((item) => {
          return {
            label: item.name,
            value: item.code,
          };
        }),
      ]}
    ></Select>
  );
};

export default Index;

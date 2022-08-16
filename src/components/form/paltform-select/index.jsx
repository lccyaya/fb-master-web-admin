import React, { useEffect } from 'react';
import { Select } from 'antd';
import { PLATFORM } from '@/constant';

const Index = ({ onChange, value }) => {
  const options = [
    { value: PLATFORM.IOS, label: PLATFORM[PLATFORM.IOS] },
    { value: PLATFORM.ANDROID, label: PLATFORM[PLATFORM.ANDROID] },
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

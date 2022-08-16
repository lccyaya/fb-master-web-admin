import React from 'react';
import { Select } from 'antd';
import { useModel } from 'umi';

const Index = ({
  defaultValue,
  onChange,
  value,
  width = 120,
  allowClear = true,
  disabled = false,
}) => {
  const { initialState } = useModel('@@initialState');
  const options = initialState.selectProjects.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return (
    <Select
      disabled={disabled}
      defaultValue={defaultValue}
      allowClear={allowClear}
      onChange={onChange}
      value={value}
      style={{ width }}
      placeholder="请选择"
      options={options}
    ></Select>
  );
};

export default Index;

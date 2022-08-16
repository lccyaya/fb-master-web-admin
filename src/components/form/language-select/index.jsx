import React, { useEffect } from 'react';
import { Select } from 'antd';

const LanguageSelect = ({
  type = 'code',
  defaultValue,
  onChange,
  value,
  disabledLanguages = [],
  languages = [],
  width = 120,
  disabled = false,
  changeBefore = (e, cb) => {
    console.log(e);
    cb();
  },
}) => {
  const options = languages.map((item) => {
    return {
      label: item.name,
      value: item[type],
      disabled: disabledLanguages.includes(item[type]),
    };
  });
  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onChange={(e) => {
        changeBefore(e, () => onChange(e));
      }}
      style={{ width }}
      placeholder="请输入"
      allowClear
      options={options}
    ></Select>
  );
};

export default LanguageSelect;

import { Select } from 'antd';
import { useIntl } from 'umi';
const Index = (props) => {
  const intl = useIntl();
  const {
    onChange = () => {},
    width,
    value,
    constant,
    noAll = false,
    disabled = false,
    allowClear = true,
  } = props;
  let options = [];
  if (Object.keys(constant).filter((e) => !isNaN(e)).length === 0) {
    let keys = [];
    Object.keys(constant).map((key) => {
      if (!keys.includes(key.toUpperCase())) {
        keys.push(key.toUpperCase());
      }
    });
    options = [
      !noAll ? { label: '所有', value: -1 } : undefined,
      ...keys.map((item) => {
        return {
          label: constant[constant[item]]?.startsWith('key_')
            ? intl.formatMessage({ id: constant[constant[item]] })
            : constant[constant[item]],
          value: constant[item],
        };
      }),
    ].filter((e) => e && e.label);
  } else {
    options = [
      !noAll ? { label: '所有', value: -1 } : undefined,
      ...Object.keys(constant)
        .filter((e) => !isNaN(e))
        .map((key) => {
          key = key * 1;
          return {
            label: constant[key]?.startsWith('key_')
              ? intl.formatMessage({ id: constant[key] })
              : constant[key],
            value: key,
          };
        }),
    ]
      .filter((e) => e && e.label)
      .sort((a, b) => {
        return a.value - b.value;
      });
  }
  return (
    <Select
      disabled={disabled}
      value={value}
      onChange={(e) => {
        console.log(e);
        onChange(e);
      }}
      style={{ width: width || 120 }}
      placeholder="请输入"
      allowClear={allowClear}
      options={options}
      dropdownMatchSelectWidth={false}
    />
  );
};

export default Index;

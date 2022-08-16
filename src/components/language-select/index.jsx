import { connect, getLocale, setLocale } from 'umi';
import { Menu, Dropdown } from 'antd';
import { useMemo } from 'react';
const LanguageSelect = () => {
  const locale = getLocale();
  const lang = [
    {
      name: '简体中文',
      key: 'zh-CN',
      icon: '🇨🇳',
    },
    {
      name: 'English',
      key: 'en-US',
      icon: '🇺🇸',
    },
  ];
  const changeLang = (key) => {
    setLocale(key);
  };
  const menu = (
    <Menu className="umi-plugin-layout-menu">
      {lang.map((item) => {
        return (
          <Menu.Item
            key={item.key}
            onClick={() => {
              changeLang(item.key);
            }}
          >
            <span style={{ marginRight: '8px' }}>{item.icon}</span>
            {item.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const curLang = useMemo(() => {
    const result = lang.find((item) => item.key === locale) || lang[0];
    return result?.name;
  }, [locale]);
  return (
    <Dropdown overlay={menu}>
      <div style={{ color: '#fff', marginLeft: 10, cursor: 'pointer' }}>{curLang}</div>
    </Dropdown>
  );
};
export default connect(({ global }) => ({}))(LanguageSelect);

import { add } from 'lodash';
import React from 'react';
import { Button, Form, Space } from 'antd';
import { useIntl } from 'umi';

const Search = ({ form, submit, nodes, reset, add, refresh, btns = [], initialValues = {} }) => {
  const intl = useIntl();
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={initialValues}
      onValuesChange={submit}
      style={{ marginBottom: 16 }}
    >
      {nodes.map((item) => {
        return (
          <Form.Item
            label={item.label}
            name={item.name}
            key={item.name}
            style={{ marginBottom: 8 }}
          >
            {item.node}
          </Form.Item>
        );
      })}

      <Space align="start">
        {add ? (
          <Button type="primary" onClick={add}>
            {intl.formatMessage({ id: 'New' })}
          </Button>
        ) : null}
        {refresh ? (
          <Button onClick={refresh} type="primary">
            {intl.formatMessage({ id: 'Refresh' })}
          </Button>
        ) : null}
        {reset ? <Button onClick={reset}>{intl.formatMessage({ id: 'Reset' })}</Button> : null}
        {btns.map((btn) => {
          return btn;
        })}
      </Space>
    </Form>
  );
};

export default Search;

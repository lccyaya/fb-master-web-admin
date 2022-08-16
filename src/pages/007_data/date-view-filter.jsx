import { Row, Col, DatePicker, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
const DateAndViewFilter = ({ onDateChange, onViewChange }) => {
  const dateShortCuts = [
    {
      name: '近 7 天',
      value: 7,
      range: [moment().subtract(6, 'days'), moment()],
    },
    {
      name: '近 15 天',
      value: 15,
      range: [moment().subtract(14, 'days'), moment()],
    },
    {
      name: '近 30 天',
      value: 30,
      range: [moment().subtract(29, 'days'), moment()],
    },
  ];
  const viewShortCuts = [
    {
      name: 'PV/UV',
      value: 'PV/UV',
    },
    {
      name: 'PV',
      value: 'PV',
    },
    {
      name: 'UV',
      value: 'UV',
    },
  ];
  const [dateRange, setDateRange] = useState(dateShortCuts[0].range);
  const [dateShortCut, setDateShortCut] = useState(dateShortCuts[0].value);
  const [viewShortCut, setViewShortCut] = useState(viewShortCuts[0].value);
  const handleDateShortCut = (rangeValue) => {
    const [start, end] = rangeValue;
    dateShortCuts.some((c) => {
      if (start.isSame(c[0], 'day') && end.isSame(c[1], 'day')) {
        setDateShortCut(c.value);
        return true;
      }
      return false;
    });
    setDateRange(rangeValue);
    onDateChange(range);
  };
  const handleDateChange = (rangeValue) => {
    handleDateShortCut(rangeValue);
  };
  const handleDateShortCutClick = (range, value) => {
    setDateShortCut(value);
    setDateRange(range);
    onDateChange(range);
  };
  useEffect(() => {
    onDateChange(dateRange);
  }, []);
  return (
    <Row justify="end">
      <Col>
        <DatePicker.RangePicker value={dateRange} onChange={handleDateChange} />
      </Col>
      <Col offset={1}>
        <Dropdown
          overlay={
            <Menu>
              {dateShortCuts.map((c) => (
                <Menu.Item
                  key={c.value}
                  onClick={() => {
                    handleDateShortCutClick(c.range, c.value);
                  }}
                >
                  {c.name}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomRight"
        >
          <Button>
            {dateShortCuts.find((c) => c.value === dateShortCut)?.name || '请选择'} <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      <Col offset={1}>
        <Dropdown
          overlay={
            <Menu>
              {viewShortCuts.map((c) => (
                <Menu.Item
                  key={c.value}
                  onClick={() => {
                    setViewShortCut(c.value);
                    onViewChange(c.value);
                  }}
                >
                  {c.name}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomRight"
        >
          <Button>
            {viewShortCuts.find((c) => c.value === viewShortCut)?.name || '请选择'} <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      {/* <Col offset={1}>
        <Button type="primary" onClick={() => onSearch?.()}>
          搜索
        </Button>
      </Col> */}
    </Row>
  );
};
export default DateAndViewFilter;

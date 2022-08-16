import { Line } from '@ant-design/charts';
import React from 'react';
const LineChart = ({ data = [] }) => {
  const config = {
    title: {
      visible: true,
      text: '多折线图',
    },
    description: {
      visible: true,
      text: '指定折线颜色',
    },
    padding: 'auto',
    forceFit: true,
    data: data,
    xField: 'date',
    yField: 'value',
    yAxis: { label: { formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) } },
    legend: { position: 'top' },
    seriesField: 'category',
    // color: ['#1979C9', '#D62A0D', 'hsl(3512.64751695072, 100%, 75%)'],
    responsive: true,
  };
  return <Line {...config} />;
};
export default React.memo(LineChart);

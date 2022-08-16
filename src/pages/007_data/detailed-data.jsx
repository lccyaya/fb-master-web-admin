import { APIFilter, API_SPORT } from '@/api';
import { useState, useEffect } from 'react';
import EventFilter from './EventFilter';
import DateAndViewFilter from './date-view-filter';
import LineChart from './line';
import moment from 'moment';
const DetailedData = () => {
  const [params, setParams] = useState({});
  const [rangDate, setRangDate] = useState([]);
  const [view, setView] = useState('PV/UV');
  const [data, setData] = useState([]);
  const calcValue = (item, type) => {
    if (type === 'PV/UV') {
      // 保留 1 位小数
      return item.uv === 0 ? 0 : Math.floor((item.pv / item.uv) * 10) / 10;
    }
    if (type === 'PV') {
      return item.pv;
    }
    return item.uv;
  };
  const fetchData = () => {
    const [start_date, end_date] = rangDate;
    API_SPORT.post('log.analytic', '', {
      ...params,
      start_date: moment(start_date).format('YYYY-MM-DD'),
      end_date: moment(end_date).format('YYYY-MM-DD'),
    })
      .then(APIFilter)
      .then((data) => {
        const statisticsData = [];
        Object.keys(res.data).forEach((k) => {
          statisticsData.push(
            ...dates.map((d) => {
              const date = d.format('YYYY-MM-DD');
              const item = res.data[k].find((dd) => dd.dt === date) || {
                pv: 0,
                uv: 0,
                dt: date,
              };
              return {
                pv: item.pv,
                uv: item.uv,
                category: k,
                date: item.dt,
                value: calcValue(item, view),
              };
            }),
          );
        });
        setData(statisticsData);
      });
  };
  useEffect(() => {
    if (Object.keys(params).length && rangDate.length) {
      fetchData();
    }
  }, [params, rangDate]);
  return (
    <div>
      <DateAndViewFilter onDateChange={setRangDate} onViewChange={setView} />
      <EventFilter onChange={setParams} />
      <LineChart data={data} />
    </div>
  );
};
export default DetailedData;

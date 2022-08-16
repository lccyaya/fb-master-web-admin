import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import api, { APIFilter, API_SPORT } from '@/api';
import { useRequest } from 'ahooks';

const Index = ({ value, onChange, width = 160 }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    API_SPORT.get('scheme.competition', '', {})
      .then(APIFilter)
      .then((data) => {
        setList(data);
      });
  }, []);
  return (
    <Select value={value} onChange={onChange} style={{ width }} placeholder="请选择">
      {list.map((item) => {
        return (
          <Select.Option key={item.competition_id} value={item.competition_id}>
            {item.competition_name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default Index;

// import React, { useEffect } from 'react';
// import { Select } from 'antd';
// import { APIFilter, API_SPORT } from '@/api';
// import { useRequest } from 'ahooks';
// const CompetitionSelect = () => {
//   return null;
// };

// // const CompetitionSelect = ({ value, onChange, width = 160 }) => {
// //   const fetchCompetionList = ({}) => {
// //     return API_SPORT.get('scheme.competition', '', {})
// //       .then(APIFilter)
// //       .then((data) => {
// //         return data.map((item) => {
// //           return {
// //             label: item.competition_name,
// //             value: item.competition_id,
// //           };
// //         });
// //       });
// //   };
// //   const fetchRequest = useRequest(fetchCompetionList, {
// //     debounceInterval: 300,
// //     manual: true,
// //   });
// //   useEffect(() => {
// //     fetchRequest.run({});
// //   }, []);
// //   return (
// //     <Select value={value} onChange={onChange} placeholder={'请输入'} allowClear style={{ width }}>
// //       {(fetchRequest?.data || []).map((item) => {
// //         return (
// //           <Select.Option key={item.value} value={item.value}>
// //             {item.label}
// //           </Select.Option>
// //         );
// //       })}
// //     </Select>
// //   );
// // };

// export default CompetitionSelect;

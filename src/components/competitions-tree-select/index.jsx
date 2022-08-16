import { TreeSelect } from 'antd';
import { APIFilter, API_SPORT } from '@/api';
import React, { useState, useEffect } from 'react';
const { SHOW_PARENT } = TreeSelect;
import { useIntl } from 'umi';

const CompetitionsTreeSelect = ({ onChange = () => {} }) => {
  const intl = useIntl();
  const [treeData, setTreeData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    API_SPORT.get('competitions', '')
      .then(APIFilter)
      .then((data) => {
        const { categories = [] } = data;
        setCategories(categories);
        const list = categories.map((item, index) => {
          return {
            title: item.category_name,
            value: `0-${index}`,
            key: `0-${index}`,
            children: item.countries.map((country, eq) => {
              return {
                title: country.country_name,
                value: `0-${index}-${eq}`,
                key: `0-${index}-${eq}`,
                children: country.competitions.map((competition, competitionIndex) => {
                  return {
                    title: competition.name,
                    value: `0-${index}-${eq}-${competitionIndex}`,
                    key: `0-${index}-${eq}-${competitionIndex}`,
                  };
                }),
              };
            }),
          };
        });
        setTreeData(list);
      });
  }, []);
  const handleChange = (newValue) => {
    const competitionId = newValue.map((value) => {
      const arr = value.split('-').slice(1);
      const [categoryIndex, countryIndex, competitionIndex] = arr;
      const curCategories = categories[categoryIndex];
      let competitions = [];
      if (competitionIndex) {
        competitions = [curCategories.countries[countryIndex].competitions[competitionIndex]];
      } else if (countryIndex) {
        competitions = curCategories.countries[countryIndex].competitions;
      } else {
        curCategories.countries.forEach((country) => {
          competitions = [...competitions, ...country.competitions];
        });
      }
      return competitions.map((item) => item.id);
    });

    onChange(competitionId.reduce((prev, curr) => prev.concat(curr), []));
  };

  const tProps = {
    treeData,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: intl.formatMessage({ id: 'Please select' }),
    onChange: handleChange,
    dropdownMatchSelectWidth: false,
    treeCheckable: true,
    showSearch: true,
    multiple: true,
    treeNodeFilterProp: 'title',
    style: {
      width: '200px',
    },
  };
  return <TreeSelect {...tProps} />;
};
export default CompetitionsTreeSelect;

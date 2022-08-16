import { APIFilter, API_SPORT } from '@/api';
import { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import styles from './index.less';
const EventFilter = ({ onChange = () => {} }) => {
  const [filters, setFilters] = useState({ conditions: [], filters: [] });
  const getFilters = () => {
    API_SPORT.get('log.events', '')
      .then(APIFilter)
      .then((data) => {
        setFilters(data);
      });
  };
  const handleClick = (type, groupIndex, itemIndex) => {
    if (!filters[type][groupIndex].log_items) return;
    const prev = filters[type][groupIndex].log_items[itemIndex].selected;
    if (type === 'conditions') {
      const selectedCount = filters[type][groupIndex].log_items.filter((l) => l.selected).length;
      if (selectedCount === 1 && filters[type][groupIndex].log_items[itemIndex].selected) {
        return;
      }
    }
    filters[type][groupIndex].log_items[itemIndex].selected = !prev;
    setFilters({ ...filters });
  };
  const setParams = () => {
    const params = {
      platforms: [],
      versions: [],
      log_event_ids: [],
    };
    filters.conditions.forEach((c) => {
      if (c.log_items) {
        params[c.code] = c.log_items.filter((l) => l.selected).map((l) => l.value);
      }
    });
    filters.filters.forEach((f) => {
      if (f.log_items) {
        params.log_event_ids.push(...f.log_items.filter((l) => l.selected).map((l) => l.value));
      }
    });
    onChange(params);
  };
  useEffect(() => {
    getFilters();
  }, []);
  useEffect(() => {
    if (filters.conditions.length === 0) return;
    setParams();
  }, [filters]);
  return (
    <div className={styles.eventFilter}>
      {[...filters.conditions, ...filters.filters].map((f, i) => {
        return (
          <div className={styles.row} key={f.name}>
            <div className={styles.label}>{f.name}：</div>
            <div className={styles.items}>
              <Space wrap>
                {f.log_items?.map((l, j) => (
                  <Button
                    type={l.selected ? 'primary' : 'default'}
                    key={l.name}
                    onClick={() => {
                      let type = 'conditions';
                      let groupIndex = i;
                      if (i >= filters.conditions.length) {
                        type = 'filters';
                        groupIndex -= filters.conditions.length;
                      }
                      handleClick(type, groupIndex, j);
                    }}
                  >
                    {l.name}
                  </Button>
                ))}
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventFilter;

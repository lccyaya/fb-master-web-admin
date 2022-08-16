import React, { useEffect, useState } from 'react';
import { Select, Modal, Table, Space, Form } from 'antd';
import CompetitionSelect from '@/components/form/competition-select';
import Search from '@/components/search';
import { useAntdTable } from 'ahooks';
import { API_SPORT, APIFilter } from '@/api';
import moment from 'moment';

const Index = (props) => {
  const { onChange = () => {}, value, disabled = false } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const columns = [
    {
      title: '比赛时间',
      width: 100,
      render: (record) => {
        return moment(record.match_time * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '联赛',
      width: 100,
      render: (record) => {
        return record.competition_name;
      },
    },
    {
      title: '球队',
      width: 200,
      render: ({ home_team_name, away_team_name }) => {
        return `${home_team_name} vs ${away_team_name}`;
      },
    },
    {
      title: '操作',
      width: 50,
      render: (record) => {
        return (
          <a
            onClick={() => {
              console.log(record);
              onChange(record);
              setVisible(false);
            }}
          >
            选择
          </a>
        );
      },
    },
  ];

  const getCompetitionMatch = ({ current, pageSize = 10 }, query) => {
    if (!query.competition_id) {
      return {
        list: [],
        total: 0,
      };
    }
    return API_SPORT.get('scheme.competition.match', '', {
      page: current,
      size: pageSize,
      ...query,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e,
          total: e.length,
        };
      });
  };

  const { tableProps, search, refresh } = useAntdTable(getCompetitionMatch, {
    defaultPageSize: 1000,
    form,
    manual: true,
  });
  useEffect(() => {
    search.reset();
  }, []);
  return (
    <>
      {value?.match_id ? (
        <Space>
          <div>
            {`${value.home_team_name} vs ${value.away_team_name} [${moment(
              value.match_time * 1000,
            ).format('YYYY-MM-DD HH:mm')}]`}
          </div>

          {!disabled ? (
            <a
              onClick={() => {
                setVisible(true);
              }}
            >
              更换
            </a>
          ) : null}
        </Space>
      ) : disabled ? (
        <></>
      ) : (
        <a
          onClick={() => {
            setVisible(true);
          }}
        >
          选择比赛
        </a>
      )}
      <Modal
        visible={visible}
        title="选择比赛"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <Search
          submit={search?.submit}
          form={form}
          refresh={refresh}
          nodes={[
            {
              label: '联赛',
              name: 'competition_id',
              node: <CompetitionSelect />,
            },
          ]}
        ></Search>
        <Table bordered columns={columns} size="small" {...tableProps} pagination={false}></Table>
      </Modal>
    </>
  );
};

export default Index;

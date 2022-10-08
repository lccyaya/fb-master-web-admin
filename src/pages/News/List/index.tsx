import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, DatePicker, Form, Input, message, Modal, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import ConstantSelect from '@/components/form/constant-select';
import Search from '@/components/search';
import { APIFilter, API_SPORT } from '@/api';
import { useAntdTable } from 'ahooks';
import moment from 'moment';
import { CheckOutlined } from '@ant-design/icons';
import {
  NEWS_IS_RECOMMEND,
  NEWS_IS_TOP,
  NEWS_TYPE,
  NEWS_TYPE_NOALL,
  SCHEME_PLAY,
  SCHEME_STATE,
} from '@/constant';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import styles from './index.module.less';
import CreateNews from '../Create';

const { RangePicker }: any = DatePicker;

type Props = {};

const NewsList: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [newsId, setNewsId] = useState(undefined);

  const columns: ColumnsType<{}> = [
    {
      title: '资讯id',
      width: 120,
      render: (record) => {
        return record.id;
      },
    },
    {
      title: '标题',
      width: 120,
      render: (record) => {
        return record.title;
      },
    },
    {
      title: '标签',
      width: 120,
      render: (record) => {
        return record.expert_name;
      },
    },
    {
      title: '作者',
      width: 120,
      render: (record) => {
        return record.nickname;
      },
    },
    {
      title: '来源',
      width: 140,
      render: (record) => {
        return record.source == '99' ? '原创' : '抓取内容源';
      },
    },
    {
      title: '更新时间',
      width: 200,
      render: (record) => {
        return moment(record.updated_at).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '类型',
      width: 120,
      render: (record) => {
        return NEWS_TYPE_NOALL[record.news_tp];
      },
    },
    {
      title: '资讯状态',
      width: 120,
      render: (record) => {
        return `${record.is_publish ? '已发布' : '未发布'}`;
      },
    },
    {
      title: '浏览量',
      width: 200,
      render: (record) => {
        return record.visit;
      },
    },
    {
      title: '点赞',
      width: 120,
      render: (record) => {
        return record.support;
      },
    },
    {
      title: '推荐状态',
      width: 120,
      render: (record) => {
        return `${record.is_rec ? '是' : '否'}`;
      },
    },
    {
      title: '置顶状态',
      width: 120,
      render: (record) => {
        return `${record.is_top ? '是' : '否'}`;
      },
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (record) => {
        return (
          <Space>
            <a
              onClick={() => {
                ReactDOM.unstable_batchedUpdates(() => {
                  setNewsId(record.id);
                  setVisible(true);
                });
              }}
            >
              编辑
              {/* {record.state === SCHEME_STATE.HIT || record.state === SCHEME_STATE.NOT_HIT
                ? '查看'
                : '编辑'} */}
            </a>
            {/* <a onClick={() => {}}>查看</a> */}
            {/* {record.state === SCHEME_STATE.SALE ? (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: '停售',
                    content: '停止售卖后未查看的用户将不可查看分析，是否确认停售？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                      API_SPORT.post('scheme.state-modify', '', {
                        id: record.id,
                        state: SCHEME_STATE.STOP_SALE,
                      })
                        .then(APIFilter)
                        .then((e) => {
                          message.success('操作成功');
                          search.submit();
                        });
                    },
                  });
                }}
                style={{ color: 'red' }}
              >
                停售
              </a>
            ) : null} */}
            {/* {record.state === SCHEME_STATE.WAIT ? ( */}
            {/* <a
              style={{ color: 'red' }}
              onClick={() => {
                Modal.confirm({
                  title: '删除',
                  content: '是否确认删除？',
                  okText: '删除',
                  cancelText: '取消',
                  onOk: () => {
                    API_SPORT.post('news.del', '', {
                      id: record.id,
                    })
                      .then(APIFilter)
                      .then((e) => {
                        message.success('删除成功');
                        refresh();
                      });
                  },
                });
              }}
            >
              删除
            </a> */}
            {/* ) : null} */}
          </Space>
        );
      },
    },
  ];

  const getNewsList = ({ current, pageSize = 10 }, query) => {
    return API_SPORT.get('news.list', '', {
      page: current,
      size: pageSize,
      ...query,
    })
      .then(APIFilter)
      .then((e) => {
        return {
          list: e.news,
          total: e.total,
        };
      });
  };
  const { tableProps, search, refresh } = useAntdTable(getNewsList, {
    defaultPageSize: 10,
    form,
    manual: true,
  });
  useEffect(() => {
    search.reset();
  }, []);

  const change = (changedValues, allValues) => {
    console.log(changedValues);
  };

  const onSearch = () => {
    search.submit(form.getFieldsValue());
  };

  return (
    <PageContainer>
      <Card>
        <Search
          form={form}
          submit={change}
          add={() => {
            ReactDOM.unstable_batchedUpdates(() => {
              setNewsId(undefined);
              setVisible(true);
            });
          }}
          // reset={search?.reset}
          reset={null}
          refresh={refresh}
          nodes={[
            // {
            //   label: '更新时间',
            //   name: 'date',
            //   node: <RangePicker />,
            // },
            {
              label: '推荐状态',
              name: 'is_rec',
              node: <ConstantSelect constant={NEWS_IS_RECOMMEND} noAll />,
            },
            {
              label: '置顶状态',
              name: 'is_top',
              node: <ConstantSelect constant={NEWS_IS_TOP} noAll />,
            },
            {
              label: '资讯类型',
              name: 'news_tp',
              node: <ConstantSelect constant={NEWS_TYPE} noAll />,
            },
            {
              label: '标题',
              name: 'title',
              node: <Input placeholder="请输入" allowClear />,
            },
          ]}
          btns={[
            <Button onClick={onSearch} type="primary">
              搜索
            </Button>,
          ]}
        />
        <Table bordered columns={columns} {...tableProps} scroll={{ x: 'max-content' }} />
        <CreateNews
          visible={visible}
          onSuccess={() => {
            setVisible(false);
            refresh();
          }}
          onCancel={() => {
            setVisible(false);
          }}
          newsId={newsId}
        />
      </Card>
    </PageContainer>
  );
};

export default NewsList;

import React, { useState, useEffect } from 'react';
import { Form, Tabs, Drawer, Button, DatePicker, Input, message } from 'antd';
import ConstantSelect from '@/components/form/constant-select';
import { SCHEME_PRICE_LIST, SCHEME_STATE } from '@/constant';
import MatchSelect from '@/components/form/match-select';
import MatchTagSelect from '@/components/form/match-tag-select';
import ExpertSelect from '@/components/form/expert-select';
import { API_SPORT, APIFilter } from '@/api';
import moment from 'moment';
import E from 'wangeditor';
import styles from './index.module.less';
// import cheerio from 'cheerio';

//转意符换成普通字符
const convertIdeogramToNormalCharacter = (val) => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return val.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t];
  });
};

// 获取富文本的纯文字内容
const getPlainText = (richCont) => {
  const str = richCont;
  let value = richCont;
  if (richCont) {
    // 方法一：
    value = value.replace(/\s*/g, ''); //去掉空格
    value = value.replace(/<[^>]+>/g, ''); //去掉所有的html标记
    value = value.replace(/↵/g, ''); //去掉所有的↵符号
    value = value.replace(/[\r\n]/g, ''); //去掉回车换行
    value = value.replace(/&nbsp;/g, ''); //去掉空格
    value = convertIdeogramToNormalCharacter(value);
    return value;
  } else {
    return null;
  }
};

let editor = null;

const { TabPane } = Tabs;

const CreateScheme = ({ visible, onCancel, onSuccess, detail }) => {
  const id = detail?.id;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then(
        ({ gold_coin, oddSchemeInfo, matchInfo, expert_id, published_at, detail, describe }) => {
          if (gold_coin) {
            if (detail && getPlainText(detail).length > 0) {
            } else {
              message.error('付费文章需要填写分析');
              return;
            }
          }

          API_SPORT.post(id ? 'scheme.update' : 'scheme.add', '', {
            id,
            match_id: matchInfo.match_id,
            odd_scheme_id: oddSchemeInfo.odd_scheme_id,
            tag: oddSchemeInfo.tag,
            gold_coin: gold_coin,
            expert_id,
            published_at: published_at.unix(),
            detail,
            detail_count: detail ? getPlainText(detail).length : 0,
            describe,
          })
            .then(APIFilter)
            .then(() => {
              message.success('操作成功');
              onCancel();
              onSuccess();
            });
        },
      );
  };
  const isEdit = !!detail?.id;

  useEffect(() => {
    if (!visible) {
      return;
    }

    editor = new E('#J_Editor_FENXI');

    editor.config = {
      ...editor.config,
      menus: ['head', 'indent', 'emoticon', 'undo', 'redo'],
      withCredentials: true,
      height: 400,
      zIndex: 100,
      placeholder: '请输入内容',
      onchange: (newHtml) => form.setFieldsValue({ detail: newHtml }),
    };

    editor.create();
    if (visible && isEdit) {
      form.setFieldsValue({
        matchInfo: {
          away_team_id: detail.away_team_id,
          away_team_name: detail.away_team_name,
          competition_name: detail.competition_name,
          competition_id: detail.competition_id,
          home_team_id: detail.home_team_id,
          home_team_name: detail.home_team_name,
          match_time: detail.match_time,
          match_status: detail.match_status,
          match_id: detail.match_id,
        },
        oddSchemeInfo: {
          odd_scheme_id: detail.odd_scheme_id,
          tag: detail.recommend,
        },
        expert_id: detail.expert_id,
        gold_coin: detail.gold_coin,
        describe: detail.describe,
        published_at: moment(detail.published_at * 1000),
        detail: detail.detail,
      });
      if (detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT) {
        editor.disable();
      }
      editor.txt.html(detail.detail || '');
    } else if (visible && !isEdit) {
      form.setFieldsValue({
        matchInfo: undefined,
        oddSchemeInfo: undefined,
        expert_id: undefined,
        gold_coin: undefined,
        describe: undefined,
        published_at: undefined,
        detail: undefined,
      });
    }

    return () => editor.destroy();
  }, [visible]);
  return (
    <Drawer
      maskClosable={false}
      title={
        isEdit
          ? detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT
            ? '查看方案'
            : '编辑方案'
          : '新增方案'
      }
      destroyOnClose
      width={800}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          {isEdit &&
          (detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT) ? null : (
            <Button
              type="primary"
              style={{ marginRight: 16 }}
              onClick={() => {
                onSubmit();
              }}
            >
              发布
            </Button>
          )}
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            取 消
          </Button>
        </div>
      }
      onClose={() => {
        onCancel();
      }}
    >
      <Form {...layout} preserve={false} form={form} autoComplete="off">
        <Form.Item label="比赛" name="matchInfo" rules={[{ required: true, message: '不能为空' }]}>
          <MatchSelect disabled={isEdit && detail?.state !== SCHEME_STATE.WAIT} />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValue, curValue) => {
            return prevValue.matchInfo?.match_id !== curValue.matchInfo?.match_id;
          }}
        >
          {() => {
            const matchId = form.getFieldValue('matchInfo')?.match_id;
            console.log(matchId);
            if (matchId) {
              return (
                <Form.Item
                  label="推荐项"
                  name="oddSchemeInfo"
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <MatchTagSelect
                    matchId={matchId}
                    disabled={isEdit && detail?.state !== SCHEME_STATE.WAIT}
                  />
                </Form.Item>
              );
            } else {
              return null;
            }
          }}
        </Form.Item>

        <Form.Item
          label="专家名称"
          name="expert_id"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <ExpertSelect width={'100%'} disabled={isEdit && detail?.state !== SCHEME_STATE.WAIT} />
        </Form.Item>
        <Form.Item
          label="方案定价"
          name="gold_coin"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <ConstantSelect
            constant={SCHEME_PRICE_LIST}
            noAll
            width={'100%'}
            disabled={isEdit && detail?.state !== SCHEME_STATE.WAIT}
          />
        </Form.Item>
        <Form.Item
          label="方案描述"
          name="describe"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input.TextArea
            placeholder="请输入"
            disabled={
              isEdit &&
              (detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT)
            }
          />
        </Form.Item>
        <Form.Item
          label="发布时间"
          name="published_at"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
            disabled={isEdit && detail?.state !== SCHEME_STATE.WAIT}
          />
        </Form.Item>
        <Form.Item label="分析正文">
          <Form.Item noStyle hidden name="detail">
            <Input
              style={{ width: 400 }}
              disabled={
                isEdit &&
                (detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT)
              }
            />
          </Form.Item>
          <div
            id="J_Editor_FENXI"
            className={
              isEdit &&
              (detail?.state === SCHEME_STATE.HIT || detail?.state === SCHEME_STATE.NOT_HIT)
                ? styles.disbaled_box
                : null
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateScheme;

import React, { useState, useEffect } from 'react';
import { Form, Tabs, Drawer, Button, DatePicker, Input, message, Radio } from 'antd';
import ConstantSelect from '@/components/form/constant-select';
import { NEWS_PLATFORM, NEWS_TYPE_NOALL, SCHEME_PRICE_LIST, SCHEME_STATE } from '@/constant';
import MatchSelect from '@/components/form/match-select';
import MatchTagSelect from '@/components/form/match-tag-select';
import AuthorSelect from '@/components/form/author-select';
import { API_SPORT, APIFilter } from '@/api';
import moment from 'moment';
import E from 'wangeditor';
import styles from './index.module.less';
import UploadImage from '@/components/upload-image';
// import cheerio from 'cheerio';

const FBDatePicker: any = DatePicker;

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

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  news: any;
};

const CreateNews: React.FC<Props> = ({ visible, onCancel, onSuccess, news }) => {
  const [form] = Form.useForm();
  const [imageType, setImageType] = useState('link');

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then(
        ({ description, oddSchemeInfo, matchInfo, expert_id, published_at, content, describe }) => {
          if (!(content && getPlainText(content).length > 0)) {
            message.error('需要填写内容');
            return;
          }

          API_SPORT.post('news.add', '', {
            match_id: matchInfo.match_id,
            odd_scheme_id: oddSchemeInfo.odd_scheme_id,
            tag: oddSchemeInfo.tag,
            description: description,
            expert_id,
            published_at: published_at.unix(),
            content,
            detail_count: content ? getPlainText(content).length : 0,
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
      onchange: (newHtml) => form.setFieldsValue({ content: newHtml }),
    };

    editor.create();
    if (visible) {
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
      title={'新增资讯'}
      destroyOnClose
      width={800}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ marginRight: 16 }}
            onClick={() => {
              onSubmit();
            }}
          >
            提交
          </Button>
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
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '不能为空' }]}>
          <Input maxLength={128} />
        </Form.Item>
        <Form.Item label="内容">
          <Form.Item noStyle hidden name="content">
            <Input style={{ width: 400 }} />
          </Form.Item>
          <div id="J_Editor_FENXI" />
        </Form.Item>
        <Form.Item label="作者" name="user_id" rules={[{ required: true, message: '不能为空' }]}>
          <AuthorSelect width={'100%'} />
        </Form.Item>
        <Form.Item
          label="摘要"
          name="description"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item label="图片1录入方式" name="radio" initialValue="link">
          <Radio.Group
            onChange={(e) => {
              setImageType(e.target.value);
            }}
          >
            <Radio value="link">图片地址</Radio>
            <Radio value="upload">图片上传</Radio>
          </Radio.Group>
        </Form.Item>
        {imageType === 'link' ? (
          <Form.Item
            label="图片1地址"
            name="img_url"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        ) : (
          <Form.Item
            label="图片1地址"
            name="img_url"
            valuePropName={'fileList'}
            rules={[{ required: true, message: '请输入' }]}
          >
            <UploadImage project="007" btnText="上传图片" />
          </Form.Item>
        )}
        <Form.Item
          label="资讯类型"
          name="news_tp"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <ConstantSelect constant={NEWS_TYPE_NOALL} noAll width={'100%'} />
        </Form.Item>
        <Form.Item label="发布范围" name="e_pfm" rules={[{ required: true, message: '不能为空' }]}>
          <ConstantSelect constant={NEWS_PLATFORM} noAll width={'100%'} />
        </Form.Item>
        <Form.Item
          label="发布状态"
          name="is_publish"
          initialValue={false}
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Radio.Group>
            <Radio value={false}>下线</Radio>
            <Radio value={true}>发布</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="推荐状态"
          name="is_rec"
          initialValue={false}
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="置顶状态"
          name="is_top"
          initialValue={false}
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="置顶时间" name="top_at">
          <FBDatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="浏览" name="visit">
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item label="点赞" name="support">
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item label="热度" name="hot">
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item label="发布时间" name="published_at">
          <FBDatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="更新时间" name="updated_at">
          <FBDatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateNews;

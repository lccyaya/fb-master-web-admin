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
  newsId?: string;
};

const CreateNews: React.FC<Props> = ({ visible, onCancel, onSuccess, newsId }) => {
  const [form] = Form.useForm();
  const [imageType, setImageType] = useState('link');
  const [news, setNews] = useState<any | undefined>();

  const isEdit = newsId ? true : false;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const onSubmit = async () => {
    const formdata = await form.validateFields();
    if (formdata) {
      if (!(formdata.content && getPlainText(formdata.content).length > 0)) {
        message.error('需要填写内容');
        return;
      }
      const res = await API_SPORT.post('sensitive', '', {
        text: formdata.content,
      });
      const data = await APIFilter(res);
      if (data.news.is_sensitive) {
        message.error(`内容中有敏感词：${data.news.text}，请重新编辑`);
        return;
      }
      const top_at = moment(formdata.top_at).unix();
      const published_at = moment(formdata.published_at).unix();
      const updated_at = moment(formdata.updated_at).unix();
      const visit = +formdata.visit;
      const support = +formdata.support;

      API_SPORT.post(isEdit ? 'news.update' : 'news.add', '', {
        ...news,
        ...formdata,
        top_at,
        published_at,
        updated_at,
        source: 99,
        visit,
        support,
      })
        .then(APIFilter)
        .then(() => {
          message.success('操作成功');
          onCancel();
          onSuccess();
        });
    }
  };

  const getNewsDetail = async () => {
    const res = await API_SPORT.get('news.details', '', {
      id: newsId,
    });
    const data = await APIFilter(res);
    if (data) {
      form.setFieldsValue({
        title: data.title,
        user_id: data.user_id,
        description: data.description,
        cover_img_url: data.cover_img_url,
        news_tp: data.news_tp,
        e_pfm: data.e_pfm,
        is_publish: data.is_publish,
        is_rec: data.is_rec,
        is_top: data.is_top,
        top_at: moment(data.top_at * 1000),
        visit: data.visit,
        support: data.support,
        published_at: moment(data.published_at * 1000),
        updated_at: moment(data.updated_at),
      });

      setNews(data);

      editor?.txt.html(data.content || '');
    }
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    editor = new E('#J_Editor_FENXI');

    editor.config = {
      ...editor.config,
      menus: ['head', 'indent', 'emoticon', 'undo', 'redo', 'image'],
      withCredentials: true,
      height: 400,
      zIndex: 100,
      placeholder: '请输入内容',
      customUploadImg: (resultFiles, insertImgFn) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const file = resultFiles[0];
        const fmData = new FormData();
        fmData.append('file', file);
        API_SPORT.post('ossUpload', '', fmData)
          .then(APIFilter)
          .then((data) => {
            message.success({ content: '上传成功', key: 'image', duration: 2 });
            insertImgFn(data.presign_url);
          })
          .catch((e) => {
            message.error({ content: '上传失败', key: 'image', duration: 2 });
          });
      },
      // uploadImgServer: 'http://47.94.89.58:8081/api/ossUpload',
      // uploadImgMaxLength: 1,
      // uploadFileName: 'file',
      // uploadImgHooks: {
      //   customInsert: (insertImgFn, result) => {
      //     // result 即服务端返回的接口
      //     console.log('customInsert', result);

      //     // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
      //     insertImgFn(result.data.presign_url);
      //   },
      // },
      onchange: (newHtml) => form.setFieldsValue({ content: newHtml }),
    };

    editor.create();

    if (isEdit) {
      getNewsDetail();
    }

    return () => editor.destroy();
  }, [visible]);

  return (
    <Drawer
      maskClosable={false}
      title={isEdit ? '编辑资讯' : '新增资讯'}
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
            name="cover_img_url"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        ) : (
          <Form.Item
            label="图片1地址"
            name="cover_img_url"
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
        <Form.Item
          label="置顶到期时间"
          name="top_at"
          rules={[{ required: true, message: '不能为空' }]}
          initialValue={moment()}
        >
          <FBDatePicker
            disabledDate={(date) => date < moment().startOf('day')}
            showTime
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="浏览" name="visit">
          <Input type="number" maxLength={20} />
        </Form.Item>
        <Form.Item label="点赞" name="support">
          <Input type="number" maxLength={20} />
        </Form.Item>
        <Form.Item
          label="发布时间"
          name="published_at"
          rules={[{ required: true, message: '不能为空' }]}
          initialValue={moment()}
        >
          <FBDatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="更新时间"
          name="updated_at"
          rules={[{ required: true, message: '不能为空' }]}
          initialValue={moment()}
        >
          <FBDatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateNews;

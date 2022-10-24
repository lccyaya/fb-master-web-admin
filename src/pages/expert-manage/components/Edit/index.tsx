import React, { useState, useEffect } from 'react';
import { Form, Tabs, Drawer, Button, DatePicker, Input, message, Radio, Space, Modal, Image } from 'antd';
import ConstantSelect from '@/components/form/constant-select';
import { NEWS_PLATFORM, NEWS_TYPE_NOALL, SCHEME_PRICE_LIST, SCHEME_STATE } from '@/constant';
import MatchSelect from '@/components/form/match-select';
import MatchTagSelect from '@/components/form/match-tag-select';
import AuthorSelect from '@/components/form/author-select';
import { API_SPORT, APIFilter } from '@/api';
import moment from 'moment';
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

let editor = null;

const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  detail?: any;
};

const EditStatus: React.FC<Props> = ({ visible, onCancel, onSuccess, detail }) => {
  const [form] = Form.useForm();
  const [imageType, setImageType] = useState('link');
  const [news, setNews] = useState<any | undefined>();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const agreeExpert = async () => {
    Modal.confirm({
      title: '专家审核',
      content: `设置${detail.nickname}的审核状态为:通过？`,
      onOk() {
        submitStatus(1)
      },
      onCancel() {
        
      },
    });
  };

  const rejectExpert = async () => {
    Modal.confirm({
      title: '专家审核',
      content: `设置${detail.nickname}的审核状态为:拒绝？`,
      onOk() {
        submitStatus(2)
      },
      onCancel() {
        
      },
    });
  };

  const submitStatus = async (status: number) => {

    API_SPORT.post('expert.auditing', '', {
      id: detail?.id || detail?.ID,
      status,
    })
      .then(APIFilter)
      .then((e) => {
        message.success('操作成功');
        onSuccess();
      })
      .finally(() => {
        
      });
  }

  useEffect(() => {
    if (visible && detail) {
      form.setFieldsValue({
        ...detail,
      });
    } else if (visible && !detail) {
      form.setFieldsValue({
        nickname: '',
        avatar: '',
        introduce: '',
      });
    }
  }, [visible]);

  return (
    <Drawer
      maskClosable={false}
      title={'专家审核'}
      destroyOnClose
      width={800}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
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
      <Form {...layout} preserve={false} form={form} autoComplete="off" disabled={true}>
        <Form.Item
          label="专家昵称"
          name="nickname"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="头像"
          name="avatar"
        >
          <Image width={200} src={detail?.avatar} />
        </Form.Item>
        <Form.Item label="简介" name="introduce" rules={[{ required: true, message: '不能为空' }]}>
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="联系方式"
          name="connect"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="真实姓名"
          name="name"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="身份证号"
          name="id_card"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="身份证正面"
          name="ic_front"
        >
          <Image width={200} src={detail?.ic_front} />
        </Form.Item>
        <Form.Item
          label="身份证反面"
          name="ic_tail"
        >
          <Image width={200} src={detail?.ic_tail} />
        </Form.Item>
      </Form>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Space size='large'>
          <Button
            type="primary"
            onClick={() => {
              agreeExpert();
            }}
          >
            通过
          </Button>
          <Button
            danger
            onClick={() => {
              rejectExpert();
            }}
          >
            拒绝
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};

export default EditStatus;

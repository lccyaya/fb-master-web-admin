import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Modal, Descriptions, Image, Space, message } from 'antd';
import api, { APIFilter, API_FEEDBACK } from '@/api';
import moment from 'moment';

const { Option } = Select;

const Index = ({ visible, onCancel, onOk, detail, languages }) => {
  return (
    <Modal
      maskClosable={false}
      title="查看反馈详情"
      destroyOnClose
      visible={visible}
      okText={'处理完成'}
      onCancel={() => {
        onCancel();
      }}
      width={800}
      onOk={async () => {
        await API_FEEDBACK.post('feedback.question.manage', '', {
          id: detail.id,
          status: 1, // 处理完成
        }).then((e) => {
          message.success('操作成功');
          onOk();
        });
      }}
    >
      <Descriptions
        layout="horizontal"
        bordered
        column={1}
        labelStyle={{ width: 120, flexShrink: 0 }}
      >
        <Descriptions.Item label="操作系统">
          {detail?.platform + (detail?.version ? `[${detail.version}]` : '')}
        </Descriptions.Item>
        <Descriptions.Item label="设备型号">
          {detail?.product ? `[${detail.product}]` : '未知'}
        </Descriptions.Item>
        <Descriptions.Item label="反馈问题">{detail?.category_name}</Descriptions.Item>
        <Descriptions.Item label="问题描述">{detail?.description || '-'}</Descriptions.Item>
        <Descriptions.Item label="反馈时间">
          {moment(detail?.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="用户邮箱">{detail?.email}</Descriptions.Item>
        <Descriptions.Item label="图片">
          {detail?.images?.length ? (
            <Image.PreviewGroup>
              <Space>
                {detail?.images?.map((src) => {
                  return <Image width={100} height={100} src={src} />;
                })}
              </Space>
            </Image.PreviewGroup>
          ) : (
            '暂无图片'
          )}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default Index;

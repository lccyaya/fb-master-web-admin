import React, { useEffect } from 'react';
import { Upload, message, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api, { APIFilter, API_SPORT } from '@/api';

// import ImgCrop from 'antd-img-crop';
// import request from 'umi-request';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = ({ fileList, onChange, btnText = '点击上传' }) => {
  // const [loading, setLoading] = useState(false);
  console.log('defaultImg', fileList);
  const [imageUrl, setImageUrl] = React.useState('');

  useEffect(() => {
    console.log('fileList', fileList);
    setImageUrl(fileList);
    () => {
      message.destroy('image');
    };
  }, [fileList]);
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      onChange(info.file.response.url);
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    if (info.file.status === 'removed') {
      onChange('');
    }
  };

  const handleUpload = async (file, filename, onSuccess) => {
    onChange('');
    const fmData = new FormData();
    fmData.append('file', file);
    message.loading({ content: '上传中...', key: 'image' });
    API_SPORT.post('upload', '', fmData)
      .then(APIFilter)
      .then((data) => {
        message.success({ content: '上传成功', key: 'image', duration: 2 });
        onChange(data.url);
        onSuccess({
          url: data.url,
          status: 'done',
          filename,
          uid: new Date().getTime(),
        });
      })
      .catch((e) => {
        message.error({ content: '上传失败', key: 'image', duration: 2 });
      });
  };

  return (
    <Upload
      listType="picture"
      maxCount={1}
      fileList={imageUrl ? [{ uid: imageUrl, url: imageUrl, name: imageUrl }] : []}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={async ({ file, onSuccess, filename, onError }) => {
        handleUpload(file, filename, onSuccess);
      }}
    >
      <Button icon={<UploadOutlined />}>{btnText}</Button>
    </Upload>
  );
};

export default UploadImage;

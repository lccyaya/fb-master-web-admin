import React, { useEffect } from 'react';
import { Upload, message, Button, Image } from 'antd';
import { randomHex32 } from '@/utils';
import api, { APIFilter, API_SPORT } from '@/api';

import { UploadOutlined } from '@ant-design/icons';
// import ImgCrop from 'antd-img-crop';
// import request from 'umi-request';

const UploadFile = ({ onChange, children, params = {}, btnText = '点击上传' }) => {
  // console.log('defaultImg', fileList);
  // const [imageUrl, setImageUrl] = React.useState('');

  // useEffect(() => {
  //   console.log('fileList', fileList);
  //   setImageUrl(fileList);
  // }, [fileList]);
  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     console.log(1111111111, info);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     onChange(info.file.response.url);
  //   }
  //   if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  //   if (info.file.status === 'removed') {
  //     onChange('');
  //   }
  // };

  const handleUpload = async (file, filename, onSuccess) => {
    onChange('');
    const fmData = new FormData();
    fmData.append('file', file);
    API_SPORT.post('ossUpload', '', fmData)
      .then(APIFilter)
      .then((data) => {
        onChange(data.url);
        onSuccess({
          url: data.url,
          status: 'done',
          filename,
          uid: new Date().getTime(),
        });
      });
  };
  return (
    <Upload
      // listType="picture"
      {...params}
      maxCount={1}
      onRemove={() => {
        onChange('');
      }}
      customRequest={async ({ file, onSuccess, filename, onError }) => {
        handleUpload(file, filename, onSuccess);
      }}
    >
      {children ? children : <Button icon={<UploadOutlined />}>{btnText}</Button>}
    </Upload>
  );
};

export default UploadFile;

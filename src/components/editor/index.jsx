import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import './editor.css';
import styles from './index.less';
import React, { useState, useEffect, useRef } from 'react';
import { ContentUtils } from 'braft-utils';
import { getTextWithoutStyle, getTextWidhoutBr, getTextWidhOnlyBr, isHtmlHaveAnyContent, getTextWidhoutTextIndent } from '@/utils/index';
import UploadFile from '@/components/upload-file';
import { PictureOutlined, MobileOutlined, BlockOutlined, ScissorOutlined, BorderLeftOutlined, ClearOutlined } from '@ant-design/icons';
import { message } from 'antd';

// 配置controls属性文档 https://www.yuque.com/braft-editor/be/gz44tn#bo49ph // 'font-size'
const controls = [
    'undo', 'redo', 'separator', 'headings', 'line-height', 'remove-styles', 'separator',
    'list-ul', 'list-ol', 'separator', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'text-indent', 'text-align', 'separator', 'emoji', 'blockquote', 'clear', 'fullscreen', 'separator'
  ]
const Editor = (props) => {
  const ref = useRef();
  const { onChange = () => {}, value, disabled, allowUpload = true } = props;
  const [editorState, setEditorState] = useState(null);
  // localStorage.getItem('previewObj');
  useEffect(() => {
    if (editorState === null && value !== undefined) {
      setEditorState(BraftEditor.createEditorState(value));
    }
  }, [value])

  // 预览点击
  const onPriview = () => {
    if (isHtmlHaveAnyContent(editorState)) {
      props.onPreview && props.onPreview();
      // localStorage.setItem('previewValue', JSON.stringify(editorState.toHTML()));
      // window.open('/#/preview');
    } else {
      message.error('您还没有输入内容哦');
    }
  }

  // 上传图片
  const uploadImg = (url) => {
    if (!url) return;
    let _newEditorState = ContentUtils.insertHTML(ref.current.getValue(), `<div><img src="${url}"/></div>`, 'paste');
    setEditorState(BraftEditor.createEditorState(_newEditorState));
  }

  // 一键清除空行
  const cleanAllBR = () => {   
    const result = getTextWidhoutBr(editorState);
    setEditorState(BraftEditor.createEditorState(result));
  }

  // 一键合并空行
  const mergeAllBR = () => {
    const result = getTextWidhOnlyBr(editorState);
    setEditorState(BraftEditor.createEditorState(result));
  }

  // 一键清除首行缩进
  const cleanTextIndent = () => {   
    const result = getTextWidhoutTextIndent(editorState);
    setEditorState(BraftEditor.createEditorState(result));
  }

  // 一键清除内联样式
  const cleanInlineStyle = () => {
    const result = getTextWithoutStyle(editorState);
    setEditorState(BraftEditor.createEditorState(result));
  }

  // 额外的配置
  const extendControls = [
      {
        key: 'antd-uploader-img',
        type: 'component',
        title: '上传文件',
        component: allowUpload ? (
          <button type="button" data-title="图片上传 支持 .png .jpg .gif 等图片格式" class="control-item button">
            <UploadFile className={styles.upload_file} params={{ showUploadList: false }} onChange={uploadImg}>
              <PictureOutlined className={styles.extra_icon}/>
            </UploadFile>
          </button>
        ) : null
      },
      {
        key: 'antd-preview-website',
        type: 'component',
        title: '预览',
        component: (
          <button onClick={onPriview} type="button" data-title="预览" class="control-item button">
            <MobileOutlined className={styles.extra_icon}/>
          </button>
        )
      },
      {
        key: 'merge-space',
        type: 'component',
        title: '合并空行',
        component: (
          <button onClick={mergeAllBR} type="button" data-title="一健合并空行" class="control-item button">
            <BlockOutlined className={styles.extra_icon}/>
          </button>
        )
      },
      {
        key: 'clean-space',
        type: 'component',
        title: '清除空行',
        component: (
          <button onClick={cleanAllBR} type="button" data-title="一健清除空行" class="control-item button">
            <ScissorOutlined className={styles.extra_icon}/>
          </button>
        )
      },
      {
        key: 'clean-text-intent',
        type: 'component',
        title: '清除首行缩进',
        component: (
          <button onClick={cleanTextIndent} type="button" data-title="一键清除首行缩进" class="control-item button">
            <BorderLeftOutlined className={styles.extra_icon}/>
          </button>
        )
      },
      {
        key: 'clean-inline-style',
        type: 'component',
        title: '清除内联样式',
        component: (
          <button onClick={cleanInlineStyle} type="button" data-title="一健清除内联样式" class="control-item button">
            <ClearOutlined className={styles.extra_icon}/>
          </button>
        )
      }
  ]
  return (
      <div className={`${styles.braft_editor} braft_content`}>
          <BraftEditor
            ref={c => ref.current = c}
            disabled={disabled}
            extendControls={extendControls} // 额外的配置
            placeholder="请输入内容"
            onChange={(e) => {
              setEditorState(e);
              onChange(e.toHTML());
              console.log('当前的代码：', e.toHTML())
            }} controls={controls}
            value={editorState}
          />
      </div>
  );
};

export default Editor;

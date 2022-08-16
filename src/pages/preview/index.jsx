import 'braft-editor/dist/index.css'; // 富文本生成的内容依赖的样式
import { useMemo, useState } from 'react';
import { Tabs } from 'antd';
import '@/components/editor/editor.css';
import styles from './index.less';
import Image from '@/components/image';
import { EyeOutlined } from '@ant-design/icons';

// 资讯的标题等信息
const TopicHeader = ({ data, type }) => {
    if (!data) return '';
    return <div className={`${styles.topic_header} ${type === 'mobile' ? styles.mobile : null}`}>
        <h5 className={styles.title}>{data.title}</h5>
        
        {/* 这是对百科的mobile端的 visit 人数在页面最底部的特殊情况做的处理 */}
        { data.mobileNoView === 'true' && type === 'mobile' ? null : <div className={styles.sub_title}>
            { data.time ? data.time : null }
            <span className={styles.visit_count}>
                <EyeOutlined size={18} color="#A8A8A8"/>
                <div className={styles.visit_count_num}>8888</div>
            </span>
        </div> }
        
        { data.img ? <Image src={data.img} isMobile={type === 'mobile'}/> : null }
    </div>
}

const PreviewPage = (props) => {
    // 展示的文本 从 localStorage 中获取
    const [previewValue, previewObjValue] = useMemo(() => {
        let previewValue = localStorage.getItem('previewValue');
        let previewObj = localStorage.getItem('previewObj');
        if (previewObj) { previewObj = JSON.parse(previewObj); }
        return [previewValue, previewObj];
    }, [])

    return (
        <div className={`${styles.preview_box} braft_content`}>
            <div className={`${styles.preview}`}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="PC端预览" key="1">
                    <div className={styles.preview_pc}>
                        <TopicHeader data={previewObjValue}/>
                        <div dangerouslySetInnerHTML={{ __html: previewValue }}></div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Mobile端预览" key="2">
                    <div className={styles.preview_mobile}>
                        <div className={styles.content_bg}>
                            <div className={styles.content}>
                                <TopicHeader data={previewObjValue} type="mobile"/>
                                <div dangerouslySetInnerHTML={{ __html: previewValue }}></div>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </div>
        </div>
    );
};

export default PreviewPage;

import React, { useEffect } from 'react'
import { message, Modal } from 'antd';
import { APIFilter, API_SPORT } from '@/api';

type Props = {
    isModalOpen: number
    detail: any
    onOk: any
    handleCancel: any
}

const IsDisable = (props: Props) => {
    const { isModalOpen, onOk, handleCancel, detail } = props
    const auditing = (params) => {
        return API_SPORT.post('expert/auditing', '', params)
            .then(APIFilter)
            .then((e) => {
                message.success(e)
                onOk()
            });
    };
    const handleOk = () => {

        const data = {
            status: isModalOpen,
            id: detail.id
        }
        auditing(data)

    }
    return (
        <div>  <Modal title={isModalOpen === 4 ? "专家禁用" : "专家启用"}
            open={isModalOpen > 0 ? true : false}
            onOk={handleOk}
            onCancel={handleCancel}

        >
            {isModalOpen === 4 &&
                <p>禁用专家：{detail.nickname}</p>
            }
            {isModalOpen === 1 &&
                <p>启用专家：{detail.nickname}</p>
            }
        </Modal></div>
    )
}

export default IsDisable




import React, { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { Select, message } from 'antd'
import { useIntl } from 'umi';
import { columns } from "./tabsconfig"
import { APIFilter, API_SPORT } from '@/api';
import { Button } from 'antd';


const Table = () => {
    const { Option } = Select
    const intl = useIntl();
    const actionRef = useRef()
    const findData = (params) => {
        console.log(params)
    }
    const [formValue, setFormValue] = useState()


    return (
        <div style={{ background: "#fff" }}> <ProTable
            bordered
            columns={columns(intl)}
            rowKey="id"
            actionRef={actionRef}
            scroll={{ x: 'max-content' }}
            dateFormatter="number"
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                size: "default",
                showTotal: false,

            }}
            search={{
                collapsed: false,
                collapseRender: () => null,
                labelWidth: 'auto',
                span: 7,
                searchText: "刷新",
                optionRender: (searchConfig, formProps, dom) => [

                    <Button type="primary" key="primary" onClick={() => {
                        actionRef.current.reload();
                    }}>
                        刷新
                    </Button>,
                    <Button key="out" onClick={() => {
                        setFormValue(null)
                        actionRef.current.reset();
                    }}>
                        重置
                    </Button>,

                ],
            }}
            form={{
                onValuesChange: (_, value) => {
                    setFormValue(value)

                }
            }}
            params={formValue}
            request={(params, sorter, filter) => {
                console.log(params, "ppppppp");
                params.create_order_begin = params.created_at && Math.round(params.created_at[0] / 1000)
                params.create_order_end = params.created_at && Math.round(params.created_at[1] / 1000)
                params.page = params.current
                params.size = params.pageSize
                delete params.current
                delete params.pageSize
                delete params.created_at
                return API_SPORT.get('scheme/order', '', params)
                    .then(APIFilter)
                    .then((e) => {
                        console.log(e);
                        return {
                            // data: e?.users,
                            data: e?.schemeList,
                            total: e?.total,
                            success: true,
                        };
                    });



            }}
            options={false}
        />

        </div>
    )
}

export default Table
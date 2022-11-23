import React from 'react'
import ProTable from '@ant-design/pro-table'
import { Select, message } from 'antd'
import { useIntl } from 'umi';
const Table = () => {
    const { Option } = Select
    const intl = useIntl();
    const columns = [
        {
            title: intl.formatMessage({ id: 'Order ID' }),
            dataIndex: 'id',
            key: 'id',
            search: true,
            // fixed: 'left',

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Order Money' }),
            dataIndex: 'id',
            key: 'id',
            search: true,
            // fixed: 'left',

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },

        {
            title: intl.formatMessage({ id: 'Actual payment time' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },

        {
            title: intl.formatMessage({ id: 'Username' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },

        {
            title: intl.formatMessage({ id: 'Create Time' }),
            dataIndex: 'id',
            key: 'id',
            search: true,
            valueType: 'dateRange',
            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Pay Time' }),
            dataIndex: 'id',
            key: 'id',
            search: true,
            valueType: 'dateRange',

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Order placing platform' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Registration channels' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Scheme title' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Expert name' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Expert ID' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Scheme play' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Order State' }),
            dataIndex: 'id',
            key: 'id',
            search: true,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Affiliated person' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: intl.formatMessage({ id: 'Recharge time' }),
            dataIndex: 'id',
            key: 'id',
            search: false,

            render: (value) => {
                return 'NO.' + value.toString().padStart(8, '0')
            },
        },
        {
            title: '玩法类型',
            dataIndex: 'orgId',
            renderFormItem: () => (
                <Select style={{ width: '100%' }} allowClear={true}>

                </Select>
            ),
            hideInTable: true,
        },
        {
            title: '攻略状态',
            dataIndex: 'orgId',
            renderFormItem: () => (
                <Select style={{ width: '100%' }} allowClear={true}>

                </Select>
            ),
            hideInTable: true,
        },

    ]
    return (
        <div style={{ background: "#fff" }}> <ProTable
            columns={columns}
            rowKey={(reward) => reward.id}
            // actionRef={actionRef}
            // pagination={{
            //     showSizeChanger: true,
            // }}
            search={{
                labelWidth: 'auto',
                span: 8,
                searchText: "刷新",


            }}
            scroll={{ x: 1600 }}
            // onReset={() => {
            //     setSearchSelect('1')
            // }}
            // request={(params, sorter, filter) => {

            //     params.startTime = params.searchtime && params.searchtime[0]
            //     params.endTime = params.searchtime && params.searchtime[1]
            //     delete params.searchname
            //     delete params.searchtime

            //     const data = getPurchasePage({ ...params })
            //     const result = data.then((b) => {
            //         setTotal(b.data.pagination.total)
            //         setTourist(b.data.pagination.totalTouristDevNum)
            //         setPrice(b.data.pagination.totalCosts)
            //         const lists = {
            //             data: b.data.list,
            //             total: b.data.pagination.total,
            //             success: true,
            //             pageSize: b.data.pagination.size,
            //             current: b.data.pagination.page,
            //         }
            //         return lists
            //     })
            //     return result
            // }}
            dateFormatter="string"

            options={false}
        /></div>
    )
}

export default Table
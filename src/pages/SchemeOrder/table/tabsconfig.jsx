
import moment from 'moment';


const columns = (intl) => {
    return [
        {
            title: intl.formatMessage({ id: 'Order ID' }),
            dataIndex: 'doc_number',
            key: 'doc_number',
            search: false,
            align: "center"
            // fixed: 'left',


        },
        {
            title: intl.formatMessage({ id: 'Order Money' }),
            dataIndex: 'gold_coin',
            key: 'gold_coin',
            search: false,
            align: "center"
            // fixed: 'left',


        },
        {
            title: intl.formatMessage({ id: 'Actual payment money' }),
            dataIndex: 'coin',
            key: 'coin',
            search: false,
            align: "center"
        },

        {
            title: intl.formatMessage({ id: 'Username' }),
            dataIndex: 'user_name',
            key: 'user_name',
            search: true,
            align: "center"
        },
        {
            title: intl.formatMessage({ id: 'Phonenumber' }),
            dataIndex: 'user_phone',
            key: 'user_phone',
            search: true,
            // hideInTable: true,
            align: "center"
        },
        // 创建时间起
        {
            title: intl.formatMessage({ id: 'Create Time' }),
            dataIndex: 'created_at',
            key: 'created_at',
            search: false,
            align: "center",
            render: (value) => {
                return moment(value).format('YYYY.MM.DD HH:mm')
            },
        },
        // 创建时间搜索
        {
            title: intl.formatMessage({ id: 'Create Time' }),
            dataIndex: 'created_at',
            key: 'created_at',
            search: true,
            valueType: 'dateRange',
            hideInTable: true,
        },
        // 支付时间？
        // {
        //     title: intl.formatMessage({ id: 'Pay Time' }),
        //     dataIndex: 'created_at',
        //     key: 'created_at',
        //     search: true,
        //     valueType: 'dateRange',
        //     align: "center"
        // },
        {
            title: intl.formatMessage({ id: 'Order placing platform' }),
            dataIndex: 'order_platform',
            key: 'order_platform',
            search: false,
            align: "center"

        },
        {
            title: intl.formatMessage({ id: 'Registration channels' }),
            dataIndex: 'channels',
            key: 'channels',
            search: false,
            align: "center"

        },
        {
            title: intl.formatMessage({ id: 'Scheme title' }),
            dataIndex: 'describe',
            key: 'describe',
            search: false,


        },
        {
            title: intl.formatMessage({ id: 'Expert name' }),
            dataIndex: 'expert_name',
            key: 'expert_name',
            search: true,
            align: "center"

        },
        {
            title: intl.formatMessage({ id: 'Expert ID' }),
            dataIndex: 'expert_id',
            key: 'expert_id',
            search: false,
            align: "center"

        },
        // 攻略玩法类型
        {
            title: intl.formatMessage({ id: 'Scheme play' }),
            dataIndex: "play",
            key: 'play',
            search: true,
            align: "center",
            valueType: 'select',
            valueEnum: {
                1: { text: '让球' },
                2: { text: '胜平负' },
                3: { text: '胜负过关' },
                4: { text: '上下单双' },
            },
        },
        {
            title: intl.formatMessage({ id: 'Scheme play type' }),
            dataIndex: "type",
            key: 'type',
            search: true,
            valueType: 'select',
            align: "center",
            valueEnum: {
                1: { text: '竞彩' },
                2: { text: '北单' },
            },
        },
        // 没有 写死
        {
            title: intl.formatMessage({ id: 'Scheme pass type' }),
            dataIndex: 'state',
            key: 'state',
            align: "center",
            search: false,
            render: (value) => {
                return "单关"
            },

        },
        {
            title: intl.formatMessage({ id: 'Scheme state' }),
            dataIndex: 'scheme_status',
            key: 'scheme_status',
            search: true,
            align: "center",
            valueType: 'select',
            valueEnum: {
                0: { text: '待上线' },

                1: { text: '在售' },
                2: { text: '停售' },
                3: { text: '命中' },
                4: { text: '未中' },
            },
        },
        {
            title: intl.formatMessage({ id: 'Order State' }),
            dataIndex: 'order_status',
            key: 'order_status',
            search: true,
            valueType: 'select',
            align: "center",
            valueEnum: {
                1: { text: '未支付', },
                2: { text: '已支付', },
                3: { text: '已退款', },
            },

        },
        {
            title: intl.formatMessage({ id: 'Insurance' }),
            dataIndex: 'insurance',
            key: 'insurance',
            align: "center",
            search: true,
            valueType: 'select',
            valueEnum: {
                0: { text: '否' },
                1: { text: '是' },
            },
        },
        {
            title: intl.formatMessage({ id: 'Affiliated person' }),
            dataIndex: 'associated_user',
            key: 'associated_user',
            search: true,
            align: "center",
            render: (value) => {
                return value == 0 ? "-" : value
            },
        },



    ]
}


export { columns }

import { Select, message } from 'antd'
import { useIntl } from 'umi';
import moment from 'moment';

// const intl = useIntl();
const columns = (intl) => {
    return [
        {
            title: intl.formatMessage({ id: 'Order ID' }),
            dataIndex: 'doc_number',
            key: 'doc_number',
            search: true,
             align: "center",
            // fixed: 'left',

          
        },
        // 搜索
        {
            title: intl.formatMessage({ id: 'Affiliated person' }),
            dataIndex: 'associated_user',
            key: 'associated_user',
            search: true,
            hideInTable: true,
             align: "center",
          
        },
        {
            title: intl.formatMessage({ id: 'Order Money' }),
            dataIndex: 'order_amount',
            key: 'order_amount',
            search: false,
             align: "center",
            // fixed: 'left',

          
        },

        {
            title: intl.formatMessage({ id: 'Actual payment money' }),
            dataIndex: 'pay_amount',
            key: 'pay_amount',
            search: false,
             align: "center",

        },
        {
            title: intl.formatMessage({ id: 'Expected fortunella venosa' }),
            dataIndex: 'should_coin',
            key: 'should_coin',
            search: false,
             align: "center",

        },
          {
            title: intl.formatMessage({ id: 'Actual coin' }),
            dataIndex: 'actual_coin',
            key: 'actual_coin',
            search: false,
            align: "center",
        },
        {
            title: intl.formatMessage({ id: 'Username' }),
            dataIndex: 'user_name',
            key: 'user_name',
            search: false,
            align: "center",
           
        },

        {
            title: intl.formatMessage({ id: 'Create Time' }),
            dataIndex: 'created_at',
            key: 'created_at',
            search: false,
           
            align: "center",
         
            render: (value) => {
                return moment(value).format('YYYY.MM.DD HH:mm')
            }
        },
        {
            title: intl.formatMessage({ id: 'Recharge success time' }),
            dataIndex: 'finish_time',
            key: 'finish_time',
            search: false,
             align: "center",
          
            render: (value) => {
                return value==0?"-":moment(value).format('YYYY.MM.DD HH:mm')
            }
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
          // 充值成功时间搜索
         {
            title: intl.formatMessage({ id: 'Recharge success time' }),
            dataIndex: 'finish_time',
            key: 'finish_time',
            search: true,
            valueType: 'dateRange',
          hideInTable: true,
        },
        {
            title: intl.formatMessage({ id: 'Recharge placing platform' }),
            dataIndex: 'charge_platform',
            key: 'charge_platform',
            valueType: 'dateRange',
            search: false,
            align: "center",
         
        },
        {
            title: intl.formatMessage({ id: 'Registration channels' }),
            dataIndex: 'register_channels',
            key: 'register_channels',
            search: false,
             align: "center",

           
        },
        {
            title: intl.formatMessage({ id: 'Recharge channels' }),
            dataIndex: 'charge_channels',
            key: 'charge_channels',
            search: false,
             align: "center",

         
        },
        {
            title: intl.formatMessage({ id: 'Affiliated order' }),
            dataIndex: 'associated_doc_number',
            key: 'associated_doc_number',
            search: false,
             align: "center",

        },

        {
            title: intl.formatMessage({ id: 'Order State' }),
            dataIndex: 'status',
            key: 'status',
            search: true,
             align: "center",

            valueType: 'select',
            valueEnum: {
                1: { text: '未支付', },
                2: { text: '已支付', },
                3: { text: '已退款', },
            },

        },
        {
            title: intl.formatMessage({ id: 'Affiliated person' }),
            dataIndex: 'AssociatedUser',
            key: 'AssociatedUser',
            search: false,
             align: "center",
            render: (value) => {
                return "-"
            },
          
        },
        {
            title: intl.formatMessage({ id: 'First Recharge time' }),
            dataIndex: 'first_charge_time',
            key: 'first_charge_time',
            search: false,
           align: "center",
            render: (value) => {
                return value==0?"-":moment(value).format('YYYY.MM.DD HH:mm')
            },
        },

     
     

    ]
}


export { columns }
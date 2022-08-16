export const BANNER_POSITION = ((ENUM) => {
  ENUM[(ENUM.HOME = 1)] = '首页';
  ENUM[(ENUM.NEWS_DETAIL = 2)] = '资讯详情页';
  ENUM[(ENUM.COIN_DETAIL = 3)] = '币详情页';
  return ENUM;
})({});

export const BANNER_TYPE_007 = ((ENUM) => {
  ENUM[(ENUM.HOME1 = 'home1')] = 'key_mobile_home_banner';
  ENUM[(ENUM.HEADLINE = 'headline')] = 'key_new_mobile_home_banner';
  ENUM[(ENUM.FLASH = 'flash')] = 'key_mobile_flash';
  ENUM[(ENUM.TIPS1 = 'tips1')] = 'key_mobile_tips_banner';
  ENUM[(ENUM.MATCH1 = 'match1')] = 'key_mobile_detail_banner';
  ENUM[(ENUM.HOME2 = 'home2')] = 'key_web_home_banner';
  ENUM[(ENUM.TIPS2 = 'tips2')] = 'key_web_tips_banner';
  ENUM[(ENUM.MATCH2 = 'match2')] = 'key_web_detail_banner';
  return ENUM;
})({});

export const POPUPS_TYPE_007 = ((ENUM) => {
  ENUM[(ENUM.POP = 'pop')] = 'key_mobile_pop';
  ENUM[(ENUM.FLOATING = 'floating')] = 'key_mobile_float_pop';
  ENUM[(ENUM.WEB_POP = 'web_pop')] = 'key_web_pop';
  return ENUM;
})({});

export const BANNER_POSITION_007_PC = ((ENUM) => {
  ENUM[(ENUM.POP_HOME2 = 'pophome2')] = 'Home';
  ENUM[(ENUM.POP_DETAIL2 = 'popdetail2')] = 'Details';
  ENUM[(ENUM.POP_TIPS2 = 'poptips2')] = 'Tips';
  ENUM[(ENUM.POP_INFO2 = 'popinfo2')] = 'Info';
  ENUM[(ENUM.POP_ME2 = 'popme2')] = 'Me';
  return ENUM;
})({});

export const BANNER_POSITION_007_MOBILE = ((ENUM) => {
  ENUM[(ENUM.POP_HOME1 = 'pophome1')] = 'Home';
  ENUM[(ENUM.POP_DETAIL1 = 'popdetail1')] = 'Details';
  ENUM[(ENUM.POP_TIPS1 = 'poptips1')] = 'Tips';
  ENUM[(ENUM.POP_INFO1 = 'popinfo1')] = 'Info';
  ENUM[(ENUM.POP_ME1 = 'popme1')] = 'Me';
  return ENUM;
})({});

export const BANNER_TYPE = ((ENUM) => {
  ENUM[(ENUM.HTTP = 1)] = '链接地址';
  ENUM[(ENUM.NEWS = 2)] = '资讯';
  ENUM[(ENUM.COIN = 3)] = '币详情页';
  return ENUM;
})({});

export const BANNER_TIME_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT = 1)] = '待生效';
  ENUM[(ENUM.DOING = 2)] = '生效中';
  ENUM[(ENUM.DONE = 3)] = '已结束';
  return ENUM;
})({});

export const BANNER_POPUPS_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT = 0)] = 'key_to_start';
  ENUM[(ENUM.DOING = 1)] = 'key_in_progress';
  ENUM[(ENUM.DONE = 2)] = 'key_over';
  return ENUM;
})({});

export const BANNER_TIME_STATUS_COLOR = ((ENUM) => {
  ENUM[(ENUM.WAIT = 1)] = '#1890ff';
  ENUM[(ENUM.DOING = 2)] = 'green';
  ENUM[(ENUM.DONE = 3)] = '#000';
  return ENUM;
})({});

export const BANNER_STATUS = ((ENUM) => {
  ENUM[(ENUM.OPEN = 1)] = '启用';
  ENUM[(ENUM.CLOSE = 2)] = '禁用';
  return ENUM;
})({});

export const NEWS_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT_COMMIT = 0)] = '待提交';
  ENUM[(ENUM.WAIT_ONLINE = 1)] = '待上线';
  ENUM[(ENUM.ON_LINE = 2)] = '上线中';
  ENUM[(ENUM.OFF_LINE = 3)] = '已下线';
  return ENUM;
})({});

export const NEWS_STATUS_COLOR = ((ENUM) => {
  ENUM[(ENUM.WAIT_COMMIT = 0)] = '#1890ff';
  ENUM[(ENUM.WAIT_ONLINE = 1)] = '#faad14';
  ENUM[(ENUM.ON_LINE = 2)] = '#73d13d';
  ENUM[(ENUM.OFF_LINE = 3)] = '#ff4d4f';
  return ENUM;
})({});
export const HOT_NEWS_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT_ONLINE = 1)] = '待上线';
  ENUM[(ENUM.ON_LINE = 2)] = '已上线';
  ENUM[(ENUM.OFF_LINE = 3)] = '已下线';
  return ENUM;
})({});

export const HOT_NEWS_STATUS_COLOR = ((ENUM) => {
  ENUM[(ENUM.WAIT_ONLINE = 1)] = '#faad14';
  ENUM[(ENUM.ON_LINE = 2)] = '#73d13d';
  ENUM[(ENUM.OFF_LINE = 3)] = '#ff4d4f';
  return ENUM;
})({});

export const NEWS_OP_TYPE = ((ENUM) => {
  ENUM[(ENUM.OFF = 0)] = '下线';
  ENUM[(ENUM.DEL = 1)] = '删除';

  return ENUM;
})({});

export const ARTICLE_OP_TYPE = ((ENUM) => {
  ENUM[(ENUM.OFF = 1)] = '下线';
  ENUM[(ENUM.DEL = 0)] = '删除';

  return ENUM;
})({});

export const PLATFORM = ((ENUM) => {
  ENUM[(ENUM.IOS = 'IOS')] = 'IOS';
  ENUM[(ENUM.ANDROID = 'Android')] = '安卓';
  return ENUM;
})({});

export const PROJECTS = ((ENUM) => {
  ENUM[(ENUM.SPORT = '077')] = '007';
  ENUM[(ENUM.BLOCK_TWITS = 'blocktwits')] = 'blocktwits';
  return ENUM;
})({});

export const FEEDBACK_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT = 0)] = '待处理';
  ENUM[(ENUM.FINISH = 1)] = '已处理';
  return ENUM;
})({});

export const FEEDBACK_STATUS_COLOR = ((ENUM) => {
  ENUM[(ENUM.WAIT = 0)] = '#faad14';
  ENUM[(ENUM.FINISH = 1)] = '#73d13d';
  return ENUM;
})({});

export const ARTICLE_AUTH = ((ENUM) => {
  // 1- 没有限制 2 - 需要登录 3 - 需要分享
  ENUM[(ENUM.ALL_AUTH = 1)] = '没有限制';
  ENUM[(ENUM.NEED_LOGIN = 2)] = '需要登录';
  ENUM[(ENUM.NEED_SHARE = 3)] = '需要分享';
  return ENUM;
})({});
// 待上线 2 - 上线中 3 - 已下线
export const ARTICLE_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT = 1)] = '待上线';
  ENUM[(ENUM.ON_LINE = 2)] = '上线中';
  ENUM[(ENUM.OFF_LINE = 3)] = '已下线';
  return ENUM;
})({});

export const ARTICLE_STATUS_COLOR = ((ENUM) => {
  ENUM[(ENUM.WAIT = 1)] = '#faad14';
  ENUM[(ENUM.ON_LINE = 2)] = '#73d13d';
  ENUM[(ENUM.OFF_LINE = 3)] = '#00000';
  return ENUM;
})({});

// 1 让球、2 胜平负、3 胜负过关、4 上下单双 0 位全部
export const SCHEME_PLAY = ((ENUM) => {
  ENUM[(ENUM.ALL = 0)] = '全部';
  ENUM[(ENUM.RQ = 1)] = '让球';
  ENUM[(ENUM.SPF = 2)] = '胜平负';
  ENUM[(ENUM.SFGG = 3)] = '胜负过关';
  ENUM[(ENUM.SXDS = 4)] = '上下单双';
  return ENUM;
})({});

// 0 待上线、1 在售、2 停售、3 命中、4 未中 0 位全部
export const SCHEME_STATE = ((ENUM) => {
  ENUM[(ENUM.ALL = -1)] = '全部';
  ENUM[(ENUM.WAIT = 0)] = '待发布';
  ENUM[(ENUM.SALE = 1)] = '在售';
  ENUM[(ENUM.STOP_SALE = 2)] = '停售';
  ENUM[(ENUM.HIT = 3)] = '命中';
  ENUM[(ENUM.NOT_HIT = 4)] = '未命中';
  return ENUM;
})({});

// 比赛状态
export const MATCH_STATE = ((ENUM) => {
  return ENUM;
})({});

// 价格档位列表
export const SCHEME_PRICE_LIST = ((ENUM) => {
  ENUM[(ENUM.PRICE_0 = 0)] = '免费';
  ENUM[(ENUM.PRICE_1 = 38)] = '38 金币';
  ENUM[(ENUM.PRICE_2 = 58)] = '58 金币';
  ENUM[(ENUM.PRICE_3 = 88)] = '88 金币';
  return ENUM;
})({});

export const YES_OR_NO = ((ENUM) => {
  ENUM[(ENUM.YES = 1)] = '是';
  ENUM[(ENUM.NO = 0)] = '否';
  return ENUM;
})({});

export const REGISTER_SOURCE = ((ENUM) => {
  ENUM[(ENUM.PC = 'PC')] = 'PC';
  ENUM[(ENUM.H5 = 'H5')] = 'H5';
  ENUM[(ENUM.ANDROID = 'Android')] = 'Android';
  ENUM[(ENUM.IOS = 'IOS')] = 'IOS';
  return ENUM;
})({});

export const HOT_NEWS_SOURCE = ((ENUM) => {
  ENUM[(ENUM.ADMIN = 1)] = '后台添加';
  ENUM[(ENUM.FLASH_FORESIGHT_NEWS = 34)] = 'foresightnews';
  ENUM[(ENUM.FLASH_CRYPTOCURRENCY_NEWS = 35)] = 'moneycontrol';
  ENUM[(ENUM.FLASH_CRYPTOCURRENCY_NEWS = 36)] = 'bitcoinmagazine';

  return ENUM;
})({});

export const SHOW_POSITION = ((ENUM) => {
  ENUM[(ENUM.ARTICLE_PAGE = 1)] = '文章页轮播';
  ENUM[(ENUM.ARTICLE_LIST_PAGE = 2)] = '文章页列表';
  ENUM[(ENUM.SUGGEST_TWITTER_PAGE = 3)] = '推荐推文';
  ENUM[(ENUM.TWITTER_PAGE = 4)] = '推文页文章';
  ENUM[(ENUM.HOME_PAGE = 5)] = '首页轮播';
  ENUM[(ENUM.COIN_DETAIL_PAGE = 6)] = '币详情页';
  return ENUM;
})({});

export const PROJECT = ((ENUM) => {
  ENUM[(ENUM.INTERNATIONAL = 0)] = 'key_international';
  ENUM[(ENUM.CHINA = 1)] = 'key_china';
  return ENUM;
})({});

export const ACTIVATE_APP = ((ENUM) => {
  ENUM[(ENUM.ACTIVE = 0)] = '否';
  ENUM[(ENUM.UNACTIVE = 1)] = '是';
  return ENUM;
})({});

export const REGISTER_PLATFORM = ((ENUM) => {
  ENUM[(ENUM.H5 = 'H5')] = 'H5';
  ENUM[(ENUM.PC = 'PC')] = 'PC';
  ENUM[(ENUM.IOS = 'iOS')] = 'iOS';
  ENUM[(ENUM.ANDROID = 'Android')] = 'Android';
  return ENUM;
})({});

// 平台
export const DATA_PLATFORM = ((ENUM) => {
  // news
  ENUM[(ENUM.COINTELEGRAPH = 1)] = 'https://graphcdn.cointelegraph.com'; // cointelegraph
  ENUM[(ENUM.BITKAN = 2)] = 'https://bitkan.club'; // 币看
  ENUM[(ENUM.CRYPTO_NEWS = 3)] = 'https://cn.cryptonews.com'; // cryptonews
  ENUM[(ENUM.FEIXIAOHAO = 4)] = 'https://www.feixiaohao.co'; // 飞小号
  ENUM[(ENUM.FTFTX = 5)] = 'https://www.ftftx.com'; // ftftx
  ENUM[(ENUM.CHAIN_FOR = 6)] = 'https://www.chainfor.pro'; // 链向资讯
  ENUM[(ENUM.COIN_DEST = 7)] = 'https://www.coindesk.com'; // coindesk
  ENUM[(ENUM.BITCOINMAGAZINE = 8)] = 'https://bitcoinmagazine.com'; // bitcoinmagazine
  ENUM[(ENUM.BITCOINIST = 9)] = 'https://bitcoinist.com'; //bitcoinist
  ENUM[(ENUM.NULLTX = 10)] = 'https://nulltx.com'; //bitcoinist
  // 快讯
  ENUM[(ENUM.FLASH_NULLTX = 30)] = 'https://nulltx.com'; // 金色财经
  ENUM[(ENUM.FLASH_THE_BLOCK_BEATS = 31)] = 'https://www.theblockbeats.info'; // 区块律动
  ENUM[(ENUM.FLASH_ODAILY = 32)] = 'https://www.odaily.news'; // 星球日报
  ENUM[(ENUM.FLASH_EIGHT_BTC = 33)] = 'https://www.8btc.com'; // 巴比特
  ENUM[(ENUM.FLASH_FORESIGHT_NEWS = 34)] = 'https://foresightnews.pro'; // Foresight News
  ENUM[(ENUM.FLASH_CRYPTOCURRENCY_NEWS = 35)] = 'https://www.moneycontrol.com'; // cryptocurrency
  ENUM[(ENUM.FLASH_BITCOINMAGZINE = 36)] = 'https://bitcoinmagazine.com'; // cryptocurrency
  ENUM[(ENUM.FLASH_CRYPTOPOTATO = 37)] = 'https://cryptopotato.com';
  // 足球
  ENUM[(ENUM.DSZUQIU = 20)] = 'https://www.dszuqiu.com'; // ds 足球
  return ENUM;
})({});
export const DATA_PLATFORM_FILE = ((ENUM) => {
  ENUM[(ENUM.COINTELEGRAPH = 1)] = 'cointelegraph'; // cointelegraph
  ENUM[(ENUM.BITKAN = 2)] = 'bitkan'; // 币看
  ENUM[(ENUM.CRYPTO_NEWS = 3)] = 'cryptonews'; // cryptonews
  ENUM[(ENUM.FEIXIAOHAO = 4)] = 'feixiaohao'; // 飞小号
  ENUM[(ENUM.FTFTX = 5)] = 'ftftx'; // ftftx
  ENUM[(ENUM.CHAIN_FOR = 6)] = 'chainfor'; // 链向资讯
  ENUM[(ENUM.COIN_DEST = 7)] = 'coindesk'; // coindesk
  ENUM[(ENUM.BITCOINMAGAZINE = 8)] = 'bitcoinmagazine'; // bitcoinmagazine
  ENUM[(ENUM.BITCOINIST = 9)] = 'bitcoinist'; // bitcoinist
  ENUM[(ENUM.NULLTX = 10)] = 'nulltx'; // nulltx
  ENUM[(ENUM.FLASH_NULLTX = 30)] = 'flash-nulltx'; // 金色财经
  ENUM[(ENUM.FLASH_THE_BLOCK_BEATS = 31)] = 'flash-the-block-beats'; // 区块律动
  ENUM[(ENUM.FLASH_ODAILY = 32)] = 'flash-odaily'; // 星球日报
  ENUM[(ENUM.FLASH_EIGHT_BTC = 33)] = 'flash-eight-btc'; // 巴比特
  ENUM[(ENUM.FLASH_FORESIGHT_NEWS = 34)] = 'flash-foresight-news'; // Foresight News
  ENUM[(ENUM.FLASH_CRYPTOCURRENCY_NEWS = 35)] = 'flash-cryptocurrency-news'; // Foresight News
  ENUM[(ENUM.FLASH_BITCOINMAGZINE = 36)] = 'flash-bitcoinmagazine';
  ENUM[(ENUM.FLASH_CRYPTOPOTATO = 37)] = 'flash-cryptopotato';
  ENUM[(ENUM.DSZUQIU = 20)] = 'dszuqiu'; // ds 足球
  return ENUM;
})({});

export const DATA_TASK_TYPE = ((ENUM) => {
  ENUM[(ENUM.NEWS_LIST = 1)] = 'Coinlive 资讯列表';
  ENUM[(ENUM.NEWS_DETAIL = 2)] = 'Coinlive 资讯详情';
  ENUM[(ENUM.NEWS_FLASH_LIST = 3)] = '快讯列表';
  ENUM[(ENUM.SPORT_NEWS_LIST = 4)] = '足球资讯列表';
  ENUM[(ENUM.SPORT_NEWS_DETAIL = 5)] = '足球资讯详情';
  return ENUM;
})({});
export const ODD_TYPE = ((ENUM) => {
  ENUM[(ENUM.HOME = 1)] = 1;
  ENUM[(ENUM.DRAW = 2)] = 2;
  ENUM[(ENUM.AWAY = 3)] = 3;
  return ENUM;
})({});

export const MATCH_RESULT = ((ENUM) => {
  ENUM[(ENUM.OTHER = 0)] = 0;
  ENUM[(ENUM.WIN = 1)] = 1;
  ENUM[(ENUM.DRAW = 2)] = 2;
  ENUM[(ENUM.LOSE = 3)] = 3;
  return ENUM;
})({});

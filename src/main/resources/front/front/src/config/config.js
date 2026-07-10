export default {
  baseUrl: window.NANJING_API_BASE
    ? `${window.NANJING_API_BASE.replace(/\/$/, '')}/`
    : 'https://ot-nanjing-api-273280-7-1369167244.sh.run.tcloudbase.com/springboot655ms/',
  indexNav: [
    {
      name: '首页',
      url: '/index/home'
    },
    {
      name: '景点信息',
      url: '/index/jingdianxinxi'
    },
    {
      name: '酒店信息',
      url: '/index/jiudianxinxi'
    },
    {
      name: '餐厅信息',
      url: '/index/cantingxinxi'
    },
    {
      name: '交通路线',
      url: '/index/jiaotongluxian'
    },
    {
      name: '旅行日记',
      url: '/index/lvxingriji'
    },
    {
      name: '攻略分享',
      url: '/index/news'
    }
  ]
}

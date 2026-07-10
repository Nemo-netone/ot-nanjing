const commonFrontMenu = [
  {
    menu: '景点信息模块',
    child: [
      {
        appFrontIcon: 'cuIcon-shop',
        buttons: ['查看', '新增', '修改', '删除', '订门票'],
        menu: '景点信息列表',
        menuJump: '列表',
        tableName: 'jingdianxinxi'
      }
    ]
  },
  {
    menu: '酒店信息模块',
    child: [
      {
        appFrontIcon: 'cuIcon-phone',
        buttons: ['查看', '新增', '修改', '删除', '订酒店'],
        menu: '酒店信息列表',
        menuJump: '列表',
        tableName: 'jiudianxinxi'
      }
    ]
  },
  {
    menu: '餐厅信息模块',
    child: [
      {
        appFrontIcon: 'cuIcon-full',
        buttons: ['查看', '新增', '修改', '删除', '订餐厅'],
        menu: '餐厅信息列表',
        menuJump: '列表',
        tableName: 'cantingxinxi'
      }
    ]
  },
  {
    menu: '交通路线模块',
    child: [
      {
        appFrontIcon: 'cuIcon-addressbook',
        buttons: ['查看', '新增', '修改', '删除'],
        menu: '交通路线列表',
        menuJump: '列表',
        tableName: 'jiaotongluxian'
      }
    ]
  },
  {
    menu: '旅行日记模块',
    child: [
      {
        appFrontIcon: 'cuIcon-newshot',
        buttons: ['查看', '新增', '修改', '删除'],
        menu: '旅行日记列表',
        menuJump: '列表',
        tableName: 'lvxingriji'
      }
    ]
  }
]

export const ROLE_MENUS = [
  {
    roleName: '管理员',
    tableName: 'users',
    hasBackLogin: '是',
    hasBackRegister: '否',
    hasFrontLogin: '否',
    hasFrontRegister: '否',
    frontMenu: commonFrontMenu,
    backMenu: []
  },
  {
    roleName: '用户',
    tableName: 'yonghu',
    hasBackLogin: '是',
    hasBackRegister: '否',
    hasFrontLogin: '是',
    hasFrontRegister: '是',
    frontMenu: commonFrontMenu,
    backMenu: []
  }
]

const AUTH_KEY_ALIASES = {
  '鏌ョ湅': '查看',
  '鏂板': '新增',
  '淇敼': '修改',
  '鍒犻櫎': '删除',
  '璁㈤棬绁?': '订门票',
  '璁㈤棬绁': '订门票',
  '璁㈤厭搴?': '订酒店',
  '璁㈤厭搴': '订酒店',
  '璁㈤鍘?': '订餐厅',
  '璁㈤鍘': '订餐厅',
  '鏀粯': '支付'
}

export function normalizeAuthKey(key) {
  return AUTH_KEY_ALIASES[key] || key
}

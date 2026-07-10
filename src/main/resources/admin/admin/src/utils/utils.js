import storage from './storage';
import menu from './menu';

const ROLE_ALIASES = {
  '绠＄悊鍛?': '管理员',
  '鐢ㄦ埛': '用户'
};

const AUTH_ALIASES = {
  '鏂板': '新增',
  '鏌ョ湅': '查看',
  '淇敼': '修改',
  '鍒犻櫎': '删除',
  '鏌ョ湅璇勮': '查看评论',
  '鏀粯': '支付',
  '璁㈤棬绁?': '订门票',
  '璁㈤厭搴?': '订酒店',
  '璁㈤鍘?': '订餐厅'
};

function normalizeRole(role) {
  return ROLE_ALIASES[role] || role || '管理员';
}

function normalizeAuthKey(key) {
  return AUTH_ALIASES[key] || key;
}

export function isAuth(tableName, key) {
  const role = normalizeRole(storage.get('role'));
  const authKey = normalizeAuthKey(key);
  const menus = menu.list();

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].roleName === role) {
      for (let j = 0; j < menus[i].backMenu.length; j++) {
        for (let k = 0; k < menus[i].backMenu[j].child.length; k++) {
          const item = menus[i].backMenu[j].child[k];
          if (tableName === item.tableName) {
            return item.buttons.includes(authKey);
          }
        }
      }
    }
  }

  return false;
}

export function getCurDateTime() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1;
  const day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getCurDate() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1;
  const day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();

  return `${year}-${month}-${day}`;
}

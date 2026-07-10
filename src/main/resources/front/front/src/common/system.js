import { ROLE_MENUS, normalizeAuthKey } from './menus'

export function isAuth(tableName, key) {
  const role = localStorage.getItem('UserTableName')
  const normalizedKey = normalizeAuthKey(key)
  const roleMenu = ROLE_MENUS.find(item => item.tableName === role)

  if (!roleMenu) {
    return false
  }

  for (const group of roleMenu.frontMenu) {
    for (const item of group.child) {
      if (item.tableName === tableName) {
        return item.buttons.includes(normalizedKey)
      }
    }
  }

  return false
}

export function getCurDateTime() {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1
  const day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate()
  const hour = currentTime.getHours()
  const minute = currentTime.getMinutes()
  const second = currentTime.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function getCurDate() {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1
  const day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate()
  return `${year}-${month}-${day}`
}

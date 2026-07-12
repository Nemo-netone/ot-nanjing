# 演示账号

## 在线入口

- 演示首页：https://ot-nanjing.pages.dev
- 管理员自动演示：https://ot-nanjing.pages.dev/?auto=admin
- 普通用户自动演示：https://ot-nanjing.pages.dev/?auto=user
- 工作人员自动演示：https://ot-nanjing.pages.dev/?auto=staff

## 公开账号

| 类型 | 演示角色值 | 原系统账号表 | 账号 | 密码 | 登录入口 |
|---|---|---|---|---|---|
| 平台管理员 | `admin` | `users` | `admin` | `admin` | `/admin/#/login` |
| 旅游用户 | `user` | `yonghu` | `账号1` | `123456` | `/#/login` |
| 景区运营 | `staff` | `yonghu` | `景区01` | `123456` | `/#/login` |

原始 Vue 系统只有“管理员”和“用户”两种界面角色。为了保留三角色作品集演示，“景区运营”作为 `yonghu` 表的兼容演示账号登录，登录后使用原系统用户界面；`staff` 是公开演示身份值，不是原项目中的独立物理账号表。

以上账号只用于公开作品集演示。不要录入真实个人、客户、支付或业务敏感数据。

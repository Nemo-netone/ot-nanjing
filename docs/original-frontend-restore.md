# 原始前端恢复记录

## 项目

- 项目名：南京旅游名胜景点管理系统
- GitHub：<https://github.com/Nemo-netone/ot-nanjing>
- 稳定演示地址：<https://ot-nanjing.pages.dev>
- 前台入口：<https://ot-nanjing.pages.dev/#/index/home>
- 前台登录：<https://ot-nanjing.pages.dev/#/login>
- 后台入口：<https://ot-nanjing.pages.dev/admin/#/login>
- Cloudflare Pages 项目：`ot-nanjing`
- Supabase schema：`ot_nanjing`

## 恢复内容

- `original-site/` 使用原项目已有构建产物：
  - 前台来自 `src/main/resources/front/front/dist`
  - 后台来自 `src/main/resources/admin/admin/dist`
- 保留旧 `site/` 统一演示壳作为兜底，没有删除原 Java/Vue 源码。
- 新增 `original-site/_worker.js`，把原系统接口适配到 Cloudflare Pages Worker：
  - `config/list`
  - `jingdianxinxi/autoSort|list|page|detail`
  - `jiudianxinxi/autoSort|list|page|detail`
  - `cantingxinxi/autoSort|list|page|detail`
  - `tianqiyubao/list|page|detail`
  - `news/list|page|detail`
  - `yonghu/login|session`
  - `users/login|session`
  - 常见 `save/add/update/delete` 演示接口
- Worker 对 HTML 动态注入：
  - `window.NANJING_API_BASE = window.location.origin`
  - 前台 `<base href="/">`
  - 后台 `<base href="/admin/">`

## 关键问题

- 原前端是 Vue2 hash 路由，正确入口应使用 `/#/...`，例如 `/#/login`。
- 原 dist 使用 `./css`、`./js` 相对路径；直接访问 `/index/home` 会让浏览器把资源解析成 `/index/css/...`。Worker 注入 `<base>` 后已修复。
- 原构建内置旧 CloudBase API 地址，必须通过 `window.NANJING_API_BASE` 覆盖为同源 Pages Worker。

## 验证记录

验证时间：2026-07-12

- `https://ot-nanjing.pages.dev/health` 返回 `frontend: original-vue-admin-front-dist`
- 前台首页可见原系统标题、导航、景点/酒店/餐厅/攻略/天气模块
- 前台旅游用户 `账号1 / 123456` 可登录并进入个人中心
- 前台景区运营 `景区01 / 123456` 可通过 `yonghu` 兼容映射登录原系统用户界面
- 后台管理员 `admin / admin` 可登录并进入后台首页
- 浏览器请求未再访问旧 CloudBase、`127.0.0.1` 或 `ot-nanjing-api` 容器地址
- 核心列表 `jingdianxinxi`、`jiudianxinxi`、`cantingxinxi`、`news` 返回有效数据
- 临时景点记录的创建、更新、删除兼容接口均返回成功，未写入持久业务数据
- Playwright 桌面端逐账号登录通过，页面无脚本错误或失败请求
- Playwright 移动视口可加载首页；原始 Vue 构建保留约 1200px 固定桌面宽度，窄屏存在横向滚动
- 截图：
  - `docs/screenshots/original-home.png`
  - `docs/screenshots/original-login.png`

## 部署命令

```powershell
npx wrangler@3 pages deploy "E:\twentySixGitHub\ThreeStandard\oneBianXian\gyq-product-1\2.项目库\2.nanjing\nanjing\original-site" --project-name ot-nanjing --branch main --commit-dirty=true
```

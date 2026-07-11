# 功能说明

`ot-nanjing` 是一个南京旅游服务平台演示项目，面向游客、注册用户和后台管理员三类使用者。

## 功能树

| 模块 | 子功能 | 入口 |
|---|---|---|
| 首页与导航 | 首页推荐、分类导航、攻略入口 | 游客端 `/` |
| 景点信息 | 景点列表、详情、收藏、评论、门票预订 | 游客端、后台端 |
| 酒店信息 | 酒店列表、详情、收藏、评论、酒店预订 | 游客端、后台端 |
| 餐厅信息 | 餐厅列表、详情、收藏、评论、餐厅预订 | 游客端、后台端 |
| 交通路线 | 路线列表、详情、评论、后台维护 | 游客端、后台端 |
| 旅行日记 | 日记列表、详情、发布、点赞、评论 | 游客端、后台端 |
| 攻略分享 | 新闻/攻略列表、详情、后台维护 | 游客端、后台端 |
| 用户中心 | 注册、登录、个人资料、头像、手机号 | 游客端 |
| 管理后台 | 用户、内容、预订、评论、配置管理 | `/admin/` |
| 文件能力 | 图片上传、富文本图片引用 | 后端 API |

## 使用场景

| 使用者 | 场景 | 典型流程 |
|---|---|---|
| 游客 | 浏览南京旅游资源 | 进入首页 -> 查看景点/酒店/餐厅/交通 -> 查看详情 |
| 注册用户 | 规划出游并产生订单 | 登录 -> 收藏景点 -> 预订门票/酒店/餐厅 -> 查看个人记录 |
| 内容用户 | 分享旅行经验 | 登录 -> 发布旅行日记 -> 其他用户浏览、点赞、评论 |
| 管理员 | 维护平台基础数据 | 登录后台 -> 新增/修改景点、酒店、餐厅、路线、攻略 |
| 管理员 | 管理订单与评论 | 进入后台列表 -> 查看预订记录 -> 支付/删除/处理评论 |

## 模块责任

| 层级 | 目录 | 责任 |
|---|---|---|
| 游客端 | `src/main/resources/front/front` | 公开访问页面、用户注册登录、内容浏览、预订交互 |
| 后台端 | `src/main/resources/admin/admin` | 管理端登录、表格管理、表单编辑、统计图表 |
| 后端控制器 | `src/main/java/com/controller` | REST API、登录注册、列表分页、详情、增删改查 |
| 数据访问 | `src/main/java/com/dao` 和 `src/main/resources/mapper` | MyBatis Plus mapper 与 SQL 映射 |
| 实体模型 | `src/main/java/com/entity` | 表结构对应的 Java 实体和视图模型 |
| 数据库迁移 | `supabase/migrations` | PostgreSQL schema、表结构和演示种子数据 |
| 原始 SQL | `db/springboot655ms.sql` | 原 MySQL 项目初始化脚本，作为迁移来源 |

## 调用链

游客端和后台端都通过配置的 API base 访问 Spring Boot 后端：

```text
Cloudflare Pages
  -> Vue Router 页面
  -> Axios / vue-resource 请求
  -> CloudBase Run Spring Boot API
  -> MyBatis Plus Service/DAO
  -> Supabase PostgreSQL ot_nanjing schema
```

生产 API base 规划为：

```text
https://ot-nanjing-api-273280-7-1369167244.sh.run.tcloudbase.com/springboot655ms
```

## 核心数据流

1. 用户在游客端浏览景点、酒店、餐厅、交通路线等列表。
2. 前端请求 `/jingdianxinxi/list`、`/jiudianxinxi/list`、`/cantingxinxi/list`、`/jiaotongluxian/list` 等接口。
3. Spring Boot 控制器接收分页和筛选参数，调用对应 Service。
4. MyBatis Plus 从 Supabase 的 `ot_nanjing` schema 读取表数据。
5. 前端渲染列表、详情、图片、收藏和评论状态。
6. 用户提交预订、评论或日记时，后端写入对应业务表。
7. 管理员在后台端通过相同 API 维护数据。

## 已实现与当前限制

已实现：

- 前后端源码修复并可构建。
- 游客端和后台端已打包到 Cloudflare Pages。
- Supabase `ot_nanjing` schema 已迁移并填充演示数据。
- README、部署文档、功能文档、账号文档和截图已补齐。

当前限制：

- CloudBase Run 后端服务详情接口返回资源隔离，线上 API 暂未验证通过。
- 因 API 暂不可用，生产演示站只能稳定展示静态页面；登录、列表数据、预订、评论和后台操作需要后端恢复后验证。
- 前端和后端项目源自较老的 Vue CLI / Spring Boot 版本，构建时存在旧版 Sass API 和 bundle size 警告。

## 在线兼容层核心功能

- 三角色登录和会话保持
- 业务概览、列表和搜索
- 新增、编辑、删除和刷新
- 景点管理：景点介绍、开放时间、门票和推荐信息
- 酒店管理：酒店房型、价格、位置和预订状态
- 餐厅管理：特色餐饮、地址、评分和营业状态
- 旅游路线：行程路线、交通方式和时间安排
- 旅行游记：用户游记、攻略、图片和互动数据
- 旅游预订：景点、酒店和餐饮预订记录

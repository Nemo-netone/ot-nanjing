# 部署记录

`ot-nanjing` 使用 GitHub 公共仓库、Cloudflare Pages、CloudBase Run 和 Supabase 的组合部署。本文档只记录公开部署事实和环境变量占位符，不记录平台令牌、数据库密码或云密钥。

## 资源清单

| 项目 | 值 |
|---|---|
| 本地项目根目录 | `E:\twentySixGitHub\ThreeStandard\oneBianXian\gyq-product-1\2.项目库\2.nanjing\nanjing` |
| GitHub 仓库 | `Nemo-netone/ot-nanjing` |
| GitHub URL | https://github.com/Nemo-netone/ot-nanjing |
| 生产分支 | `main` |
| Cloudflare Pages 项目 | `ot-nanjing` |
| 稳定演示地址 | https://ot-nanjing.pages.dev |
| 后台入口 | https://ot-nanjing.pages.dev/admin/ |
| CloudBase Run 服务 | `ot-nanjing-api` |
| API base | `https://ot-nanjing-api-273280-7-1369167244.sh.run.tcloudbase.com/springboot655ms` |
| Supabase schema | `ot_nanjing` |
| 数据库迁移 | `supabase/migrations/202607090001_init_ot_nanjing.sql` |
| License | PolyForm Noncommercial License 1.0.0 |
| 首次部署提交 | `f368937 pr1-init-ot-nanjing-deployment` |
| 最后验证时间 | `2026-07-10 10:37:04 +08:00` |

## 首次生产分支

首次 Cloudflare Pages 生产部署使用 `main` 分支。后续重新发布应继续使用：

```powershell
npx wrangler@3 pages deploy pages-site --project-name ot-nanjing --branch main
```

保持项目名 `ot-nanjing` 和生产分支 `main` 不变，默认地址就会继续使用：

```text
https://ot-nanjing.pages.dev
```

## 前端部署结构

`pages-site/` 是本地生成的静态发布目录，不提交到 Git。生成规则：

| 路径 | 内容 |
|---|---|
| `pages-site/` | 游客端 Vue 构建产物 |
| `pages-site/admin/` | 后台端 Vue 构建产物 |

构建命令：

```powershell
Set-Location src/main/resources/front/front
npm run build

Set-Location ../../admin/admin
npm run build
```

部署命令：

```powershell
npx wrangler@3 pages deploy pages-site --project-name ot-nanjing --branch main
```

## 后端部署结构

后端是 Spring Boot 2.2 + Java 8 容器服务。`Dockerfile` 使用本地预编译 jar：

```dockerfile
FROM eclipse-temurin:8-jre
WORKDIR /app
COPY target/nanjing.jar /app/nanjing.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/nanjing.jar"]
```

打包命令：

```powershell
mvn -B -DskipTests clean package
```

CloudBase Run 提交命令：

```powershell
tcb -e meta-d5gh4ds014005aff1 cloudrun deploy --serviceName ot-nanjing-api --port 8080 --source . --force
```

## 环境变量占位符

CloudBase Run 后端需要以下环境变量。真实值只能配置在平台环境变量或本机临时环境中，不能写入仓库。

| 变量 | 用途 |
|---|---|
| `DB_DRIVER_CLASS_NAME` | JDBC 驱动，PostgreSQL 使用 `org.postgresql.Driver` |
| `DB_URL` | Supabase PostgreSQL JDBC URL，带 `currentSchema=ot_nanjing` |
| `DB_USERNAME` | 项目专用数据库运行角色 |
| `DB_PASSWORD` | 项目专用数据库运行密码 |
| `APP_CONTEXT_PATH` | 后端上下文路径，生产使用 `/springboot655ms` |
| `APP_AUTH_SECRET` | 应用鉴权密钥 |
| `CORS_ALLOWED_ORIGINS` | 允许的前端来源，生产使用 `https://ot-nanjing.pages.dev` |

## Supabase 隔离策略

本项目只使用 `ot_nanjing` schema。迁移脚本会先执行：

```sql
CREATE SCHEMA IF NOT EXISTS ot_nanjing;
SET search_path TO ot_nanjing;
```

部署和维护时禁止对 `public` schema 或其他项目 schema 执行覆盖、删除、清空操作。

已验证的非破坏性查询：

```sql
select 'users' as table_name, count(*) from ot_nanjing.users
union all select 'yonghu', count(*) from ot_nanjing.yonghu
union all select 'jingdianxinxi', count(*) from ot_nanjing.jingdianxinxi
union all select 'jiudianxinxi', count(*) from ot_nanjing.jiudianxinxi
union all select 'cantingxinxi', count(*) from ot_nanjing.cantingxinxi
union all select 'jiaotongluxian', count(*) from ot_nanjing.jiaotongluxian;
```

结果显示：`users` 1 条，`yonghu` 9 条，景点/酒店/餐厅/交通核心表各 9 条。

## 验证记录

| 检查项 | 状态 | 说明 |
|---|---|---|
| 游客端构建 | 通过 | `npm run build` 成功，存在旧版 Sass 和 bundle size 警告 |
| 后台端构建 | 通过 | `npm run build` 成功，存在旧版 Sass 和 bundle size 警告 |
| 后端打包 | 通过 | `mvn -B -DskipTests clean package` 成功，生成 `target/nanjing.jar` |
| Supabase schema | 通过 | `ot_nanjing` 表和种子数据已存在 |
| Cloudflare Pages | 通过 | `/` 和 `/admin/` 返回 200 |
| 截图 | 通过 | `docs/screenshots/home.png`、`admin.png`、`mobile.png` 已生成 |
| CloudBase Run API | 未通过 | 服务对象存在，但详情接口返回 `ResourceUnavailable.ResourceIsolated` |

## 当前阻塞

CloudBase Run 的 `ot-nanjing-api` 服务在列表中显示 `normal` 且允许公网访问，但服务详情接口返回：

```text
ResourceUnavailable.ResourceIsolated
```

平台提示资源包过期或资源配额不足。恢复方式通常是升级/恢复 CloudBase 资源包，或在明确确认后释放不再使用的 CloudBase Run 服务。不要在未确认的情况下删除其他项目服务。

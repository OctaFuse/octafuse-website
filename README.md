# OctaFuse Website

OctaFuse 官网与文档站（[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)）。与 [`octafuse-gateway`](https://github.com/OctaFuse/octafuse-gateway) **独立仓库**，构建与发布流水线互不干扰。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：<http://localhost:4321>（`/` 会重定向到 `/zh/`）。

## 构建

```bash
npm run build
npm run preview
```

产物目录：`dist/`。

## Cloudflare Pages

在 Cloudflare Pages 新建项目并关联本仓库：

| 项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22`（或读取 `.nvmrc`） |

预览与生产构建仅在本仓库提交时触发，**不会**联动 `octafuse-gateway` 的 Worker / 镜像发布。

### 本仓库 CI/CD（与 gateway 完全隔离）

| Workflow | 触发 | 作用 |
| --- | --- | --- |
| [`.github/workflows/site-ci.yml`](.github/workflows/site-ci.yml) | `pull_request`、推送到 `main` | `npm ci` + `npm run build`，校验静态站 |
| [`.github/workflows/pages-deploy.yml`](.github/workflows/pages-deploy.yml) | 仅 `workflow_dispatch` | 可选：用 Wrangler 将 `dist/` 推到 Pages（需仓库 Secrets，见下） |
| [`.github/workflows/sync-from-gateway.yml`](.github/workflows/sync-from-gateway.yml) | 手动 | 从 gateway 拉取白名单文档，**不**触发 gateway CI |

在 GitHub 本仓库 **Settings → Secrets and variables → Actions** 中按需配置（仅在使用 Wrangler 手动部署时需要）：

- `CLOUDFLARE_API_TOKEN`：含 **Cloudflare Pages — Edit** 权限的 API Token  
- `CLOUDFLARE_ACCOUNT_ID`：账户 ID（与 `wrangler whoami` / Dashboard 右侧栏一致）

## 内容结构

```
src/content/docs/
  zh/          # 中文（默认语言）
  en/          # 英文镜像
```

- `/zh/`、`/en/` — 官网首页（splash）
- `/zh/docs/`、`/en/docs/` — 文档首页与导航下的子页

权威 API / 迁移契约仍以主仓文档为准；本站正文在 `src/content/docs/` 中**人工维护**（可配合 AI 起草），重要结论处保留指向主仓的链接即可。

## 相关仓库

- 网关源码与权威文档：[OctaFuse/octafuse-gateway](https://github.com/OctaFuse/octafuse-gateway)

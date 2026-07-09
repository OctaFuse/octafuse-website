# OctaFuse Website

OctaFuse 官网与文档站（[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)）。与 [`octafuse-gateway`](https://github.com/OctaFuse/octafuse-gateway) **独立仓库**，构建与发布流水线互不干扰。

**生产站点（canonical）**：[`https://octafuse.dev`](https://octafuse.dev) — 由根目录 `astro.config.mjs` 的 `site` 字段声明，用于 sitemap / 绝对 URL；Cloudflare Pages 自定义域名需与此一致。

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

### 自定义域名与上线验收

1. 在 **Workers & Pages → 本项目 → Custom domains** 添加 **`octafuse.dev`**（及可选 **`www.octafuse.dev`**），等待状态 **Active** 与证书就绪。
2. 按向导在 **DNS** 添加 **CNAME**（或 apex 所需的 **CNAME flattening** / **A/AAAA** 记录，以 Cloudflare 提示为准）。
3. 选定 **规范主机名**（apex 或 `www` 二选一为主域），另一主机名配置 **301** 重定向，避免 SEO 重复收录。
4. 若曾使用旧域名（如 `docs.octafuse.ai`），在旧 Pages 项目或 **Bulk Redirects / Redirect Rules** 配置 **301 → `https://octafuse.dev`**。
5. 发布后抽检：`/zh/`、`/en/docs/quick-start/`、文档内外链与深色/浅色切换。

### 本仓库 CI/CD（与 gateway 发布隔离）

| Workflow | 触发 | 作用 |
| --- | --- | --- |
| [`.github/workflows/site-ci.yml`](.github/workflows/site-ci.yml) | `pull_request`、推送到 `main` | `npm ci` + `npm run build`，校验静态站 |
| [`.github/workflows/pages-deploy.yml`](.github/workflows/pages-deploy.yml) | 仅 `workflow_dispatch` | 可选：用 Wrangler 将 `dist/` 推到 Pages（需仓库 Secrets，见下） |
| [`.github/workflows/sync-from-gateway.yml`](.github/workflows/sync-from-gateway.yml) | 手动 | 从 gateway 白名单生成技术参考页，**不**触发 gateway CI |

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

## 文档维护边界

技术文档的单一事实来源在 `octafuse-gateway/docs`：

- API、部署、迁移、架构、计费、审计、时间语义：维护在 `octafuse-gateway`。
- 官网正文：维护品牌、首页、导航、SEO、多语言，以及面向使用者的轻量任务指南。
- 官网 [GitHub 技术参考](src/content/docs/zh/docs/github-reference.mdx) 由 `sync/contract.json` 生成，避免手工维护旧路径。

两个仓库并排放置时，可本地刷新技术参考页：

```bash
npm run sync:gateway -- --gateway-dir ../octafuse-gateway
```

检查是否漂移但不写文件：

```bash
npm run sync:gateway:check -- --gateway-dir ../octafuse-gateway
```

新增技术文档时，先改 `octafuse-gateway/docs`；官网只在需要展示入口时更新 `sync/contract.json`。

## 相关仓库

- 网关源码与权威文档：[OctaFuse/octafuse-gateway](https://github.com/OctaFuse/octafuse-gateway)

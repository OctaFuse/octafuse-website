# AGENTS.md

本文件给各类 coding agent。人类开发者读 [README.md](README.md)。

OctaFuse 官网与文档站，[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)。与 `octafuse-gateway` 是独立仓库，构建和发布互不影响。生产站点 `https://octafuse.dev`。

## 命令

```bash
npm install
npm run dev          # http://localhost:4321 ，/ 会转到 /zh/
npm run build
npm run preview
```

两个仓库并排时：

```bash
npm run sync:gateway -- --gateway-dir ../octafuse-gateway
npm run sync:gateway:check -- --gateway-dir ../octafuse-gateway
```

## 边界

- API、部署、迁移、架构、计费的单一事实来源是 `octafuse-gateway/docs`。官网只维护品牌、首页、导航、SEO、多语言，以及面向使用者的轻量指南。
- 技术参考页和目录数据由 `sync/contract.json` 生成。新增技术文档先改 Gateway 仓库，再按需改同步契约。
- Provider 权威数据在 Gateway 的 `packages/admin/lib/provider-import-presets.json`，Model 在 `packages/admin/lib/model-presets/*.json`。官网 `src/data/catalog/*.json` 只用于展示。
- 中文在 `src/content/docs/zh/`，英文在 `src/content/docs/en/`。改一边时核对另一边是否要同步。
- 本仓库的 CI 不要去触发 gateway 的 Worker 或镜像发布。

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

仅更新目录条目时，沿用 `sync/manifest.json` 中的 Gateway 版本生成目录并检查。生成、构建、发布和上线核对步骤见 [README「供应商和模型模板」](README.md#供应商和模型模板)。

## 边界

- API、部署、迁移、架构、计费的技术文档维护在 `octafuse-gateway/docs`。官网维护品牌、首页、导航、SEO、多语言、轻量指南和公开目录模板。
- 官网技术参考页按 `sync/contract.json` 生成。新增技术文档先改 Gateway 仓库，再按需改同步契约。
- Gateway 管理后台默认通过官网目录 API 读取导入和同步模板。供应商模板维护在 `catalog/providers.json`，模型模板按厂商和模型类型维护在 `catalog/models/*.json`。
- 生成脚本从官网工作区读取模板，从指定的 Gateway 版本读取厂商名称映射和技术参考资料。将模板和 `src/data/catalog/` 下对应的生成文件一起提交到官网 PR，通过官网的 Cloudflare Pages 流程发布。
- 中文在 `src/content/docs/zh/`，英文在 `src/content/docs/en/`。改一边时核对另一边是否要同步。
- 本仓库的 CI 不要去触发 gateway 的 Worker 或镜像发布。

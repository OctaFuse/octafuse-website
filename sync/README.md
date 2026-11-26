# Gateway 文档同步契约

官网维护三类内容：

- 品牌、首页、导航、SEO、多语言页面。
- 面向使用者的轻量指南与任务摘要。
- 供应商和模型导入目录（`catalog/`），Gateway 管理后台默认从官网读取。

API、部署、迁移、架构、计费、审计、时间语义等技术内容的单一事实来源是 `octafuse-gateway/docs`。本站的 [GitHub 技术参考](../src/content/docs/zh/docs/github-reference.mdx) 由 `sync/contract.json` 生成，避免手写旧路径或重复维护。

## 本地同步

两个仓库并排放置时：

```bash
npm run sync:gateway -- --gateway-dir ../octafuse-gateway
```

检查是否有漂移但不写文件：

```bash
npm run sync:gateway:check -- --gateway-dir ../octafuse-gateway
```

## GitHub 同步

`.github/workflows/sync-from-gateway.yml` 可手动触发，传入明确的正式版本 ref 后会刷新技术参考页和 `sync/manifest.json`，并按需打开 PR。

## 维护规则

- 新增技术文档：先写入 `octafuse-gateway/docs`。
- 官网要展示该入口：只改 `sync/contract.json` 的白名单条目。
- 官网正文可以写用户任务摘要，但不要复制 API 字段表、部署 runbook 或迁移细节。
- 如果官网摘要与 gateway 文档冲突，以 gateway 文档为准。


同步默认 ref 由 `contract.json` 固定为已发布版本。使用本地 Gateway 时，脚本从所选 ref 创建临时快照；不会把当前 develop 或未提交文件标成另一个版本。同步成功后应先查看 diff，再运行 `npm run sync:gateway:check` 与构建验收。正式版本切换时，长期指南的 `gatewayRef` 及双语内容也要重新核验。

供应商协议列表从端点数据派生，不能手写局部枚举；官网预设目录、部署中的 `/catalog/models` 与用户 `/v1/models` 是三个不同用途的数据入口。

## 目录数据

供应商和模型的导入目录不再从 Gateway 仓库同步，而是在本仓库维护：`catalog/providers.json` 与 `catalog/models/*.json`。`npm run sync:gateway` 读取它们生成 `src/data/catalog/*.json`，并从指定的 Gateway 版本读取厂商名称映射（`packages/admin/lib/model-vendors.json`）。Gateway 管理后台默认读取 `https://octafuse.dev/api/catalog/*`。步骤见 [README「供应商和模型模板」](../README.md#供应商和模型模板)。

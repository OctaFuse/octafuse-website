# Gateway 文档同步契约

官网只维护两类内容：

- 品牌、首页、导航、SEO、多语言页面。
- 面向使用者的轻量指南与任务摘要。

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

`.github/workflows/sync-from-gateway.yml` 可手动触发，传入 gateway ref 后会刷新技术参考页和 `sync/manifest.json`，并按需打开 PR。

## 维护规则

- 新增技术文档：先写入 `octafuse-gateway/docs`。
- 官网要展示该入口：只改 `sync/contract.json` 的白名单条目。
- 官网正文可以写用户任务摘要，但不要复制 API 字段表、部署 runbook 或迁移细节。
- 如果官网摘要与 gateway 文档冲突，以 gateway 文档为准。

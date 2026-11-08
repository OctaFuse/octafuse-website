import type { StarlightUserConfig } from '@astrojs/starlight/types';

/** Shared task-based navigation; every entry has a Chinese and English page. */
export const docsSidebar: StarlightUserConfig['sidebar'] = [
	{ label: '文档概览', slug: 'docs', translations: { en: 'Documentation overview' } },
	{
		label: '开始使用', translations: { en: 'Get started' }, collapsed: false,
		items: [
			{ label: '支持能力与边界', slug: 'docs/capabilities', translations: { en: 'Capabilities and limits' } },
			{ label: '快速开始', slug: 'docs/quick-start', translations: { en: 'Quick start' } },
			{ label: '接入客户端', slug: 'docs/guides/clients', translations: { en: 'Connect clients' } },
		],
	},
	{
		label: '模型与路由', translations: { en: 'Models and routing' }, collapsed: false,
		items: [
			{ label: '供应商配置', slug: 'docs/guides/providers', translations: { en: 'Providers' } },
			{ label: '模型与官方目录', slug: 'docs/guides/models', translations: { en: 'Models and catalog sync' } },
			{ label: '路由与故障转移', slug: 'docs/guides/routing', translations: { en: 'Routing and failover' } },
			{ label: '供应商额度', slug: 'docs/guides/provider-quotas', translations: { en: 'Provider quotas' } },
		],
	},
	{
		label: '多模态接入', translations: { en: 'Multimodal APIs' }, collapsed: false,
		items: [
			{ label: '图片生成与编辑', slug: 'docs/guides/images', translations: { en: 'Image generation and editing' } },
			{ label: '语音与实时音频', slug: 'docs/guides/audio', translations: { en: 'Speech and realtime audio' } },
			{ label: '向量 Embeddings', slug: 'docs/guides/embeddings', translations: { en: 'Embeddings' } },
		],
	},
	{
		label: '智能体工具', translations: { en: 'Agent tools' }, collapsed: false,
		items: [
			{ label: 'REST 服务', slug: 'docs/guides/tools', translations: { en: 'REST services' } },
			{ label: 'MCP 服务', slug: 'docs/guides/mcp', translations: { en: 'MCP servers' } },
			{ label: 'MCP OAuth 授权', slug: 'docs/guides/oauth', translations: { en: 'MCP OAuth authorization' } },
		],
	},
	{
		label: '用户与计费', translations: { en: 'Users and billing' }, collapsed: false,
		items: [
			{ label: '用户管理', slug: 'docs/guides/users', translations: { en: 'Users' } },
			{ label: 'API 密钥与限流', slug: 'docs/guides/api-keys', translations: { en: 'API keys and rate limits' } },
			{ label: '额度、价格与折扣', slug: 'docs/guides/billing', translations: { en: 'Quotas, pricing and discounts' } },
			{ label: '系统集成', slug: 'docs/guides/integration', translations: { en: 'System integration' } },
			{ label: '系统配置', slug: 'docs/guides/system-config', translations: { en: 'System configuration' } },
		],
	},
	{
		label: '观测与排障', translations: { en: 'Observe and debug' }, collapsed: false,
		items: [
			{ label: '调试台', slug: 'docs/features/playground', translations: { en: 'Playground' } },
			{ label: '模拟器', slug: 'docs/features/simulator', translations: { en: 'Simulator' } },
			{ label: '请求流程与日志', slug: 'docs/guides/request-logs', translations: { en: 'Request flows and logs' } },
			{ label: '用量与可靠性分析', slug: 'docs/guides/analytics', translations: { en: 'Usage and reliability' } },
			{ label: '账户审计', slug: 'docs/guides/audit-logs', translations: { en: 'Account audit' } },
		],
	},
	{
		label: '部署与维护', translations: { en: 'Deploy and maintain' }, collapsed: false,
		items: [
			{ label: '选择部署方式', slug: 'docs/deploy/overview', translations: { en: 'Choose a deployment' } },
			{ label: 'Docker 部署', slug: 'docs/deploy/docker', translations: { en: 'Docker deployment' } },
			{ label: 'Cloudflare 部署', slug: 'docs/deploy/cloudflare', translations: { en: 'Cloudflare deployment' } },
			{ label: '升级与迁移', slug: 'docs/deploy/upgrades', translations: { en: 'Upgrades and migrations' } },
			{ label: '维护模式', slug: 'docs/deploy/maintenance', translations: { en: 'Maintenance mode' } },
		],
	},
	{
		label: '目录与参考', translations: { en: 'Catalog and reference' }, collapsed: false,
		items: [
			{ label: '供应商目录', slug: 'catalog/providers', translations: { en: 'Provider catalog' } },
			{ label: '模型目录', slug: 'catalog/models', translations: { en: 'Model catalog' } },
			{ label: 'GitHub 技术参考', slug: 'docs/github-reference', translations: { en: 'GitHub technical reference' } },
		],
	},
];

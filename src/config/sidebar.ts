import type { StarlightUserConfig } from '@astrojs/starlight/types';

/** Shared docs sidebar — workflow-first groups; labels use `translations` for English. */
export const docsSidebar: StarlightUserConfig['sidebar'] = [
	{ label: '概览', slug: 'docs', translations: { en: 'Overview' } },
	{
		label: '开始使用',
		translations: { en: 'Get started' },
		collapsed: false,
		items: [
			{ label: '快速开始', slug: 'docs/quick-start', translations: { en: 'Quick start' } },
			{ label: '接入自己的系统', slug: 'docs/guides/integration', translations: { en: 'Integrate your system' } },
		],
	},
	{
		label: '配置工作流',
		translations: { en: 'Configure' },
		collapsed: false,
		items: [
			{ label: '供应商配置', slug: 'docs/guides/providers', translations: { en: 'Providers' } },
			{ label: '模型配置', slug: 'docs/guides/models', translations: { en: 'Models' } },
			{ label: '路由配置', slug: 'docs/guides/routing', translations: { en: 'Routing' } },
			{ label: '图片生成 / 编辑', slug: 'docs/guides/images', translations: { en: 'Image generation / edit' } },
			{ label: 'Agent Tools', slug: 'docs/guides/tools', translations: { en: 'Agent Tools' } },
			{ label: '用户管理', slug: 'docs/guides/users', translations: { en: 'Users' } },
			{ label: 'API Key 管理', slug: 'docs/guides/api-keys', translations: { en: 'API keys' } },
			{ label: '系统配置', slug: 'docs/guides/system-config', translations: { en: 'System config' } },
		],
	},
	{
		label: '联调与排障',
		translations: { en: 'Debug and observe' },
		collapsed: false,
		items: [
			{ label: 'Playground', slug: 'docs/features/playground', translations: { en: 'Playground' } },
			{ label: 'Simulator', slug: 'docs/features/simulator', translations: { en: 'Simulator' } },
			{ label: '请求日志', slug: 'docs/guides/request-logs', translations: { en: 'Request logs' } },
			{ label: '审计日志', slug: 'docs/guides/audit-logs', translations: { en: 'Audit logs' } },
			{ label: 'Analytics', slug: 'docs/guides/analytics', translations: { en: 'Analytics' } },
		],
	},
	{
		label: '部署上线',
		translations: { en: 'Deploy' },
		collapsed: false,
		items: [
			{
				label: 'Cloudflare Workers 部署',
				slug: 'docs/deploy/cloudflare',
				translations: { en: 'Cloudflare Workers' },
			},
			{ label: 'Docker 部署', slug: 'docs/deploy/docker', translations: { en: 'Docker' } },
		],
	},
	{
		label: '技术参考',
		translations: { en: 'Reference' },
		collapsed: false,
		items: [
			{
				label: 'GitHub 技术参考',
				slug: 'docs/github-reference',
				translations: { en: 'GitHub technical reference' },
			},
		],
	},
];

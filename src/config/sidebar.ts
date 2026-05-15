import type { StarlightUserConfig } from '@astrojs/starlight/types';

/** Shared docs sidebar — two-level groups; labels use `translations` for English. */
export const docsSidebar: StarlightUserConfig['sidebar'] = [
	{
		label: '首页',
		translations: { en: 'Home' },
		slug: 'index',
	},
	{
		label: '文档',
		translations: { en: 'Documentation' },
		items: [
			{ label: '文档首页', slug: 'docs', translations: { en: 'Overview' } },
			{ label: '快速开始', slug: 'docs/quick-start', translations: { en: 'Quick Start' } },
			{
				label: '使用指南',
				translations: { en: 'User guide' },
				collapsed: false,
				items: [
					{ label: '供应商配置', slug: 'docs/guides/providers', translations: { en: 'Providers' } },
					{ label: '模型配置', slug: 'docs/guides/models', translations: { en: 'Models' } },
					{ label: '路由配置', slug: 'docs/guides/routing', translations: { en: 'Routing' } },
					{ label: '用户管理', slug: 'docs/guides/users', translations: { en: 'Users' } },
					{ label: 'API Key 管理', slug: 'docs/guides/api-keys', translations: { en: 'API keys' } },
					{ label: '请求日志', slug: 'docs/guides/request-logs', translations: { en: 'Request logs' } },
					{ label: '审计日志', slug: 'docs/guides/audit-logs', translations: { en: 'Audit logs' } },
					{ label: '系统配置', slug: 'docs/guides/system-config', translations: { en: 'System config' } },
					{ label: '系统集成', slug: 'docs/guides/integration', translations: { en: 'Integration' } },
				],
			},
			{
				label: '其他功能',
				translations: { en: 'More features' },
				collapsed: false,
				items: [
					{ label: 'Playground', slug: 'docs/features/playground', translations: { en: 'Playground' } },
					{ label: 'Simulator', slug: 'docs/features/simulator', translations: { en: 'Simulator' } },
				],
			},
			{
				label: '线上部署',
				translations: { en: 'Production deploy' },
				collapsed: false,
				items: [
					{ label: 'Docker 部署', slug: 'docs/deploy/docker', translations: { en: 'Docker' } },
					{
						label: 'Cloudflare Workers 部署',
						slug: 'docs/deploy/cloudflare',
						translations: { en: 'Cloudflare Workers' },
					},
				],
			},
			{
				label: 'GitHub 技术参考',
				slug: 'docs/github-reference',
				translations: { en: 'GitHub technical reference' },
			},
		],
	},
];

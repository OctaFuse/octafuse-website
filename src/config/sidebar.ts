import type { StarlightUserConfig } from '@astrojs/starlight/types';

/** Shared docs sidebar — labels use `translations` for English. */
export const docsSidebar: StarlightUserConfig['sidebar'] = [
	{
		label: '官网首页',
		translations: { en: 'Home' },
		slug: 'index',
	},
	{
		label: '文档',
		translations: { en: 'Documentation' },
		items: [
			{
				label: '文档首页',
				slug: 'docs',
				translations: { en: 'Overview' },
			},
			{
				label: '快速开始',
				slug: 'docs/quick-start',
				translations: { en: 'Quick Start' },
			},
			{
				label: '部署指南',
				slug: 'docs/deploy',
				translations: { en: 'Deployment' },
			},
		],
	},
];

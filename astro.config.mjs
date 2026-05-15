// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { docsSidebar } from './src/config/sidebar.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.octafuse.ai',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'OctaFuse',
			description:
				'面向团队与企业场景的 AI Gateway，统一承接多业务系统的模型调用需求。',
			tagline: '面向团队与企业场景的 AI Gateway',
			defaultLocale: 'zh',
			locales: {
				zh: {
					label: '简体中文',
					lang: 'zh-CN',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/OctaFuse/octafuse-gateway',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/OctaFuse/octafuse-website/edit/main/',
			},
			sidebar: docsSidebar,
			customCss: ['./src/styles/custom.css'],
		}),
	],
});

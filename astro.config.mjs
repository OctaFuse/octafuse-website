// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { docsSidebar } from './src/config/sidebar.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://octafuse.dev',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'OctaFuse',
			description:
				'可自托管的开源 AI 能力网关与运营控制面：统一接入 Chat、图片生成与可扩展 Agent Tools，集中管理路由、密钥、预算、计费和审计。',
			tagline: '统一 AI 能力，掌控每一次调用',
			defaultLocale: 'zh',
			logo: {
				src: './public/favicon.svg',
				alt: 'OctaFuse',
			},
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: 'anonymous',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..600;1,14..32,400..600&family=JetBrains+Mono:wght@400;500&display=swap',
					},
				},
				{
					tag: 'script',
					content: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?3d0ec74d9a0bb0c976f630229e1f02b6";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`,
				},
			],
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
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/OctaFuse/octafuse-website/edit/main/',
			},
			sidebar: docsSidebar,
			customCss: ['./src/styles/custom.css'],
		}),
	],
});

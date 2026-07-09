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
				'开源 AI Gateway：一个 Base URL、一个 API Key，统一接入多家模型供应商与各类 Plan。个人汇总分散密钥，团队与企业统一 Provider、分 Key、预算与审计。',
			tagline: '一个 Base URL，统一接入所有 AI 模型与计划',
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

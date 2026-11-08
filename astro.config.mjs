// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { docsSidebar } from './src/config/sidebar.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://octafuse.dev',
	// Keep extensionless catalog endpoints reachable in dev as well as on the static host.
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			title: 'OctaFuse',
			description:
				'可自托管的开源 AI 能力网关与运营控制面：统一接入对话、图片、语音、向量与 MCP，集中管理路由、用户额度、计费和请求追踪。',
			tagline: '统一 AI 能力，掌控每一次调用',
			defaultLocale: 'zh',
			logo: {
				src: './public/logo.svg',
				alt: '',
			},
			favicon: '/favicon.svg?v=octagon-v1',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' } },
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
				Header: './src/components/Header.astro',
				Footer: './src/components/Footer.astro',
				Pagination: './src/components/updates/UpdatePagination.astro',
				PageTitle: './src/components/PageTitle.astro',
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

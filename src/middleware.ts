import type { MiddlewareHandler } from 'astro';

/** 根路径：开发时用 HTTP 重定向，避免 `Astro.redirect` 在静态站生成的 2 秒 meta 刷新页。生产见 `public/_redirects`。 */
export const onRequest: MiddlewareHandler = (context, next) => {
	const p = context.url.pathname;
	if (p === '/' || p === '') {
		return Response.redirect(new URL('/zh/', context.url), 302);
	}
	return next();
};

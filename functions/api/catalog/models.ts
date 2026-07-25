import catalog from '../../../src/data/catalog/models.json';

interface RateLimitBinding {
	limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
	CATALOG_RATE_LIMITER?: RateLimitBinding;
}

interface PagesContext {
	request: Request;
	env: Env;
}

const LIMIT = 10;
const WINDOW_SECONDS = 60;
const catalogBody = JSON.stringify(catalog);
const etag = `"model-catalog-${catalog.source.commit}"`;

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
	'Access-Control-Allow-Headers': 'Accept, If-None-Match',
	'Access-Control-Max-Age': '86400',
};

const rateLimitHeaders = {
	'RateLimit-Policy': `${LIMIT};w=${WINDOW_SECONDS}`,
	'X-RateLimit-Limit': String(LIMIT),
	'X-RateLimit-Window': String(WINDOW_SECONDS),
};

function jsonError(status: number, code: string, message: string, extraHeaders: HeadersInit = {}) {
	return new Response(
		JSON.stringify({
			error: {
				code,
				message,
			},
		}),
		{
			status,
			headers: {
				...corsHeaders,
				...rateLimitHeaders,
				...extraHeaders,
				'Cache-Control': 'no-store',
				'Content-Type': 'application/json; charset=utf-8',
			},
		},
	);
}

function clientKey(request: Request) {
	const forwardedFor = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For');
	const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
	return `model-catalog:${ip}`;
}

async function handleCatalogRequest({ request, env }: PagesContext) {
	if (!env.CATALOG_RATE_LIMITER) {
		return jsonError(503, 'rate_limiter_unavailable', 'The public catalog API is temporarily unavailable.');
	}

	const { success } = await env.CATALOG_RATE_LIMITER.limit({ key: clientKey(request) });
	if (!success) {
		return jsonError(
			429,
			'rate_limit_exceeded',
			`Too many requests. Please retry in ${WINDOW_SECONDS} seconds.`,
			{ 'Retry-After': String(WINDOW_SECONDS) },
		);
	}

	const headers = {
		...corsHeaders,
		...rateLimitHeaders,
		'Cache-Control': 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400',
		'Content-Type': 'application/json; charset=utf-8',
		ETag: etag,
	};

	if (request.headers.get('If-None-Match') === etag) {
		return new Response(null, { status: 304, headers });
	}

	return new Response(request.method === 'HEAD' ? null : catalogBody, { headers });
}

export const onRequestGet = handleCatalogRequest;
export const onRequestHead = handleCatalogRequest;

export const onRequestOptions = () =>
	new Response(null, {
		status: 204,
		headers: {
			...corsHeaders,
			...rateLimitHeaders,
		},
	});

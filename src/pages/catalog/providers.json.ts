import type { APIRoute } from 'astro';
import catalog from '../../data/catalog/providers.json';

export const prerender = true;

export const GET: APIRoute = () =>
	new Response(JSON.stringify(catalog, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'public, max-age=3600',
		},
	});

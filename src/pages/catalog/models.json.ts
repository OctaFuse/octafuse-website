import type { APIRoute } from 'astro';
import catalog from '../../data/catalog/models.json';

export const prerender = true;

export const GET: APIRoute = () =>
	new Response(JSON.stringify(catalog, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});

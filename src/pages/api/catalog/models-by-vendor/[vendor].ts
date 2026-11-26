import type { APIRoute } from 'astro';
import catalog from '../../../../data/catalog/models.json';

export const prerender = true;

export function getStaticPaths() {
	return [...new Set(catalog.items.map((item) => item.vendor))]
		.sort()
		.map((vendor) => ({ params: { vendor } }));
}

export const GET: APIRoute = ({ params }) => {
	const items = catalog.items.filter((item) => item.vendor === params.vendor);
	return new Response(
		`${JSON.stringify({
			schema_version: catalog.schema_version,
			catalog: catalog.catalog,
			source: catalog.source,
			source_path: catalog.source_path,
			count: items.length,
			items,
		}, null, 2)}\n`,
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=3600',
			},
		},
	);
};

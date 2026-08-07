import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				publishDate: z.coerce.date().optional(),
				updateLabel: z.string().optional(),
				featuredUpdate: z.boolean().optional().default(false),
			}),
		}),
	}),
};

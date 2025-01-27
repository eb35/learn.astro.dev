import { defineCollection, z } from "astro:content";

const products = defineCollection({
    type: "data",
    schema: z.object({
        product_id: z.number(),
        product_name: z.string(),
        price: z.number(),
        in_stock: z.boolean(),
        colors: z.array(z.string()),
        details: z.object({
            brand: z.string(),
            model: z.string(),
            screen_size: z.number().optional(),
            wireless: z.boolean().optional(),
            features: z.array(z.string()),
        }),
    }),
});

const posts = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string().max(65, {
            message: "Title cannot be longer than 65 characters",
        }),
        description: z.string().max(165, {
            message: "Description cannot be longer than 165 characters",
        }),
        image: image(),
        pubDate: z.date(),
        isDraft: z.boolean().optional(),
    }),
});

export const collections = {
    products,
    posts,
};
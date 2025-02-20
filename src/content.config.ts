import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import { parse as parseToml } from "toml";
import { parse as parseCsv } from "csv-parse/sync";

export const collections = {
    todos: defineCollection({
        loader: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await res.json();
            return data.map((todo: any) => ({ 
                ...todo,
                id: todo.id.toString()
            }))
        },
        schema: z
            .object({
                userId: z.number(),
                id: z.string(),
                title: z.string(),
                completed: z.boolean(),
            })
            .transform((data) => ({
                taskName: data.title,
                isComplete: data.completed,
            }))
    }),
    posts: defineCollection({
        loader: glob({
            pattern: "src/data/posts/**/*.md",
            generateId: ({ entry, data }) => entry.replace("src/data/posts/", "").replace(".md", ""),
        }),
        schema: (({ image }) => z.object({
            title: z.string().max(32, { message: "Title too long" }),
            tags: z.array(z.string()),
            pubDate: z.coerce.date(),
            isDraft: z.boolean(),
            canonicalURL: z.string().url().optional(),
            cover: image(),
            coverAlt: z.string(),
            author: reference("team"),
        }))
    }),
    team: defineCollection({
        loader: file("src/data/team.json"),
        schema: z.object({
            name: z.string(),
            role: z.string(),
            email: z.string().email(),
            todos: z.array(reference("todos")),
            department: z.enum([
                "Engineering",
                "Software Development",
                "Product Design"
            ])
        })
    }),
    cats: defineCollection({
        loader: file("src/data/cats.csv", {
            parser: (text) => parseCsv(text, {
                columns: true,
                skipEmptyLines: true,
            })
        })
    }),
    toml: defineCollection({
        loader: file("src/data/sample.toml", {
            parser: (text) => parseToml(text).servers,
        })
    })
};
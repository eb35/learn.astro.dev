import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { parse as parseToml } from "toml";
import { parse as parseCsv } from "csv-parse/sync";

export const collections = {
    posts: defineCollection({
        loader: glob({
            pattern: "src/data/posts/**/*.md",
            // generateId: ({ entry, data }) => data.title as unknown as string,
        }) 
    }),
    team: defineCollection({
        loader: file("src/data/team.json"),
        schema: z.object({
            name: z.string(),
            role: z.string(),
            email: z.string().email(),
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
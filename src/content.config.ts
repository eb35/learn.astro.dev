import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    loader: glob({
      pattern: "src/data/posts/**/*.md",
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string().max(32),
        tags: z.array(z.string()),
        pubDate: z.coerce.date(),
        isDraft: z.boolean(),
        canonicalURL: z.string().url().optional(),
        cover: image(),
        coverAlt: z.string(),
        author: reference("team"),
        slug: z.string(),
      }),
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
        "Product Design",
      ]),
    }),
  }),
  pokemons: defineCollection({
    loader: async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
      const data = await response.json();
      return data.results.map((pokemon: any) => ({
        id: pokemon.name,
        ...pokemon
      }))
    },
    schema: z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
  }),

};

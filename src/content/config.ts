import { defineCollection, reference, z } from "astro:content";
import teamSchema from "../schemas/teamSchema";
import roleSchema from "../schemas/roleSchema";
import postSchema from "../schemas/postSchema";


const team = defineCollection({
    type: 'data',
    schema: teamSchema,
});

const role = defineCollection({
    type: 'data',
    schema: roleSchema,
});

const posts = defineCollection({
    type: 'content',
    schema: postSchema,
});

export const collections = {
    team,
    role,
    posts,
};
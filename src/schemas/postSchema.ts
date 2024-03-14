import { Image } from 'astro:assets';
import { reference, z } from "astro:content";

const postSchema = ({ image }: any) => 
    z.object({
        title: z.string().max(65, {
            message: "Your title must be 65 characters or less",
        }),
        tags: z.array(z.string()),
        pubDate: z.date(),
        isDraft: z.boolean(),
        canonicalUrl: z.string().url().optional(),
        author: reference("team"),
        cover: image().refine((img: any) => img.width >= 1000, {
            message: "Cover image must be at least 1000 pixels wide!",
        }),
        coverAlt: z.string(),
    });

export default postSchema;
import { reference, z } from "astro:content";

const team = z.object({
    name: z.string(),
    role: reference("role"),
    location: z.string().optional(),
});

export default team;
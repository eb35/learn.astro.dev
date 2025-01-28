export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ params, request, redirect }) => {
    // const id = params.id as CollectionEntry<"blog">["id"];
    // const post = await getEntry("blog", id);
    // if (!post) {
    //     return redirect("/404");
    // }
    // return new Response(JSON.stringify(post));

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
        const post = await getEntry("blog", id);
        if (!post) {
            return redirect("/404", 307);
        }
        return new Response(JSON.stringify(post));
    }

    const allPosts = await getCollection("blog");
    return new Response(JSON.stringify(allPosts));
}

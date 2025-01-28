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

    // const url = new URL(request.url);
    // const id = url.searchParams.get("id");
    // if (id) {
    //     const post = await getEntry("blog", id);
    //     if (!post) {
    //         return redirect("/404", 307);
    //     }
    //     return new Response(JSON.stringify(post));
    // }

    // const allPosts = await getCollection("blog");
    // return new Response(JSON.stringify(allPosts));

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
        try {
            console.log("Private Key", import.meta.env.API_KEY);
            console.log("Public Key", import.meta.env.PUBLIC_API_KEY);
            const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                headers: {
                    authorization: `Bearer ${import.meta.env.API_KEY}`,
                }
            });
            if (req.status === 404) {
                return redirect("/404", 307);
            } else if (!req.ok) {
                throw new Error("There was a problem fetching your post");
            }
            const res = await req.json();
            if (!res) {
            }
            return new Response(JSON.stringify(res));
        } catch (e) {
            return new Response(JSON.stringify(e));
        }
    }
    try {
        const req = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!req.ok) {
            throw new Error("There was a problem fetching your posts");
        }
        const res = await req.json();
        return new Response(JSON.stringify(res));
    } catch (e) {
        return new Response(JSON.stringify(e));
    }
}

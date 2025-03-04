import type { OpenLibraryDocsItem } from "@/types/OpenLibrary";
import type { APIRoute } from "astro";
import { Book, db } from "astro:db";

export const GET: APIRoute = async ({ request }) => {
    // get query params
    const query = new URL(request.url).searchParams.get("search");

    // return early if no params
    if (!query) {
        return new Response(JSON.stringify({
            data: [],
            error: null
        }))
    }

    // query the api
    console.log("url is", `https://openlibrary.org/search.json?q=${query}&limit=6`)
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=6`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        // get back books data
        const data = await res.json();

        // query the response for data we want
        const books = data.docs.map((book: OpenLibraryDocsItem) => ({
            title: book.title,
            author: book.author_name,
            cover: `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`,
            id: book.key.replaceAll("/works/", ""),
        }))

        //return
        return new Response(JSON.stringify({
            data: books,
            error: null,
        }));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            data: null,
            error: error instanceof Error ? error.message : error,
        }));
    }

    return new Response(JSON.stringify({ success: true }));
};

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    try {
        if (!data || !data.title || !data.author || !data.cover || !data.id) {
            // check each type and sanitize
            throw new Error("No book selected");
        }

        const dbData = await db.insert(Book).values({
            ...data,
            status: "to_read",
        });

        return new Response(JSON.stringify({
            data: dbData,
            error: null,
        }))
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            data: null,
            error: error instanceof Error ? error.message : error,
        }));
    }
}
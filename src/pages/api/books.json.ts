import type { OpenLibraryDocsItem } from "@/types/OpenLibrary";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    // get query params

    // return early if no params

    // query the api
    try {
        const res = await fetch("https://openlibrary.org/search.json?q=the+lord+of+the+rings&limit=6");

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        // get back books data
        const data = await res.json();

        // query the response for data we want
        const books = data.docs.map((book: OpenLibraryDocsItem) => ({
            title: book.title,
            author: book.author_name,
            cover: `https://covers.openlibrary.org/a/olid/${book.cover_i}.jpg`,
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
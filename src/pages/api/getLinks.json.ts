import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    try {
        const req = await fetch("http://localhost:3000/links");

        if (!req.ok) {
            throw new Error("There was a problem reading fromthe json server");
        }

        const res = await req.json();
        return new Response(JSON.stringify(res), {
            status: 200
        });
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return new Response(JSON.stringify({ message: e.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ message: "There was an unknown error" }), { status: 500 });
    }
};
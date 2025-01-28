export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request, redirect }) => {
    return new Response(JSON.stringify({
        message: "This was a GET!"
    }))
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        if (!data.title) {
            return new Response(JSON.stringify({
                message: "Title is required"
            }), { status: 400 })
        }

        const req = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!req.ok) {
            throw new Error("There was an error");
        }
        const res = await req.json();
        return new Response(JSON.stringify(res));
    } catch (e) {
        throw new Error("There was an error");
    }
}

export const PUT: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new Response(JSON.stringify({
                message: "ID is required"
            }), { status: 400 });
        }
        const data = await request.json();

        const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!req.ok) {
            throw new Error("There was an error");
        }
        const res = await req.json();
        return new Response(JSON.stringify(res));
    } catch (e) {
        throw new Error("There was an error");
    }
}

export const DELETE: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new Response(JSON.stringify({
                message: "ID is required"
            }), { status: 400 });
        }

        const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        if (!req.ok) {
            throw new Error("There was an error");
        }
        const res = await req.json();
        return new Response(JSON.stringify(res));
    } catch (e) {
        throw new Error("There was an error");
    }
}

export const ALL: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: `This was a ${request.method}!`
    }))
}

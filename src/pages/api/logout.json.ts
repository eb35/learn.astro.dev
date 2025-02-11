import type { APIRoute } from "astro";
import { projectAuth } from "../../firebase/config";

export const POST: APIRoute = async () => {
    try {
        await projectAuth.signOut();
        return new Response(JSON.stringify({ message: "Logged out" }),{
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500
        });
    }
}
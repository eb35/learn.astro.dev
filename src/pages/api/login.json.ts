import type { APIRoute } from "astro";
import { projectAuth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const POST: APIRoute = async ({ request }) => {
    const { email, password } = await request.json();
    
    try {
        const user = await signInWithEmailAndPassword(projectAuth, email, password);
        return new Response(JSON.stringify({ message: "Logged in" }),{
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500
        });
    }
}
import type { APIRoute } from "astro";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { projectAuth } from "../../firebase/config";

export const POST: APIRoute = async ({ request }) => {
    const { email, password } = await request.json();
    
    try {
        const user = await createUserWithEmailAndPassword(projectAuth, email, password);
        return new Response(JSON.stringify({ message: "Account created" }),{
            status: 201
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500
        });
    }
}
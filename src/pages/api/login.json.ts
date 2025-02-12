import type { APIRoute } from "astro";
import { validateInputs } from "../../auth/validateInputs";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";
import { lucia } from "../../auth";

export const POST: APIRoute = async (context) => {
    const { username, password } = await context.request.json();
    
    try {
        const { success, message } = validateInputs({ username, password });

        if (!success) {
            throw new Error(message);
        }

        // does the user exist
        const usersMatching = await db
            .select()
            .from(User)
            .where(eq(User.username, username));
        if (usersMatching.length < 1) {
            throw new Error("Incorrect username or password");
        }

        // password valid?
        const validPassword = await new Argon2id().verify(
            usersMatching[0].password_hash,
            password
        )
        if (!validPassword) {
            throw new Error("Incorrect username or password");
        }

        // create session
        const session = await lucia.createSession(usersMatching[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
        );

        return context.redirect("/");
    } catch (error) {
        return new Response(
            JSON.stringify({ 
                message: error instanceof Error ? error.message : error,
            }), 
            {
                status: 500
            }
        );
    }
}
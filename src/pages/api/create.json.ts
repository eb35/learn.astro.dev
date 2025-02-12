import type { APIRoute } from "astro";
import { db, eq, User } from "astro:db";
import { lucia } from "../../auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { validateInputs } from "../../auth/validateInputs";

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
        if (usersMatching.length > 1) {
            throw new Error("User already exists");
        }

        // create user id
        const userId = generateId(16);

        // hash password
        const hashedPassword = await new Argon2id().hash(password);

        // create user
        await db
            .insert(User)
            .values({
                id: userId,
                username,
                password_hash: hashedPassword,
            });

        // create session cookies
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
        );

        // redirect
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
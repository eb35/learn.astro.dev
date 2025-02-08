import type { APIRoute } from "astro";
import { db, Links } from "astro:db";

export const GET: APIRoute = async () => {
  try {
    const req = await db.select().from(Links)

    return new Response(JSON.stringify(req), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({
        message: e instanceof Error ? e.message : "There was an unknown error",
      })
    );
  }
};

import type { APIRoute } from "astro";
import { db, Links } from "astro:db";
import sanitize from "sanitize-html";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  try {
    const { title, description, url, isRead } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof url !== "string" ||
      typeof isRead !== "boolean"
    ) {
      throw new Error("Please provide all required fields.");
    }

    const req = await db.insert(Links).values({
      title: sanitize(title),
      description: sanitize(description),
      url: sanitize(url),
      isRead,
      upvoteNum: 0,
    });

    return new Response(
      JSON.stringify({
        message: req,
        success: true,
      }),
      {
        status: 201,
      }
    );
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message,
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "There was an unknown error",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};

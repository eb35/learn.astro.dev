import { db, Logs } from "astro:db";
import { defineMiddleware } from "astro:middleware";
import { date } from "astro:schema";

export const onRequest = defineMiddleware(async (context, next) => {
    const request = await next();
    if (request.status !== 200) {
        console.log("logging error");
        await db.insert(Logs).values({
            url: context.url.pathname,
            date_accessed: new Date(),
        })
    }
    return next();
})
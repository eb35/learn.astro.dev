import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // const { url } = context;
    // if (url.pathname === "/") {
    //     return Response.redirect(new URL("/redirected", url), 302);
    // }
    const pathname = context.url.pathname;
    context.locals.userMessage = () => {
        // pathname check
        // auth status
        const authStatus = true;
        if (pathname === "/" && !authStatus) {
            return "You must be logged in.";
        }
        if (pathname === "/") {
            return "Freedom!"
        }
        return "";
    };

    if (pathname === "/") {
        const response = await next();
        const html = await response.text();
        const redactedHtml = html.replaceAll("PRIVATE INFO", "REDACTED");
        return new Response(redactedHtml, {
            status: 200,
            headers: response.headers
        });
    }

    return next();
})
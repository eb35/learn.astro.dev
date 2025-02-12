import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    // const isLoggedIn = projectAuth.currentUser;
    // const { pathname } = context.url;
    
    // if (isLoggedIn && (pathname === "/create" || pathname === "/login")) {
    //     return context.redirect("/");
    // }

    // if (
    //     !isLoggedIn && 
    //     pathname !== "/create" && 
    //     pathname !== "/login" && 
    //     context.request.method === "GET"
    // ) {
    //     return context.redirect("/login");    
    // }

    return next();
})
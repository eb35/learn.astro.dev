import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    const authHeader = context.request.headers.get("Authorization");

    const protectedRoutes = ["/admin", "/secret"];
    const { pathname } = context.url;
    console.log("🚀 ~ onRequest ~ pathname:", pathname)
    
    if (protectedRoutes.includes(pathname)) {
        if (authHeader) {
            const authValue = authHeader.split(" ")[1] ?? "username:password";
    
            const [username, password] = atob(authValue).split(":");
            
            if (username.toLowerCase() === "rob" && password === "access") {
                return next();
            }
        }
        
        return new Response("Auth required", {
            status: 401,
            headers: {
                "WWW-authenticate": 'Basic realm="Secure Area"',
            }        
        })
    }

    return next();
})
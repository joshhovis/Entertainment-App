import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware((auth, req) => {
    if (isUserRoute(req)) {
        const profileUrl = new URL("/profile", req.url);
        return NextResponse.redirect(profileUrl);
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        // Always run for API routes
        "/(api|trpc)(.*)",
        "/profile(.*)",
    ],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher(["/user(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req) => {
    if (isUserRoute(req)) {
        const profileUrl = new URL("/profile", req.url);
        return NextResponse.redirect(profileUrl);
    }

    if (!isPublicRoute(req)) {
        const { userId } = auth();
        if (!userId) {
            const signInUrl = new URL("/sign-in", req.url);
            return NextResponse.redirect(signInUrl);
        }
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

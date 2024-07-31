"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInForm from "../../components/SignInForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CustomRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push("/profile");
    }, [router]);

    return null;
}

export default function SignInPage() {
    return (
        <>
            <SignedIn>
                <CustomRedirect />
            </SignedIn>
            <SignedOut>
                <SignInForm />
            </SignedOut>
        </>
    );
}

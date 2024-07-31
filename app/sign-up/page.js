"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignUpForm from "../../components/SignUpForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CustomRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push("/profile");
    }, [router]);

    return null;
}

export default function SignUpPage() {
    return (
        <>
            <SignedIn>
                <CustomRedirect />
            </SignedIn>
            <SignedOut>
                <SignUpForm />
            </SignedOut>
        </>
    );
}

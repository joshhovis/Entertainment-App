"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignUpForm from "../../components/SignUpForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
    const CustomRedirect = () => {
        const router = useRouter();

        useEffect(() => {
            router.push("/");
        }, [router]);

        return null;
    };

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
};

export default SignUpPage;

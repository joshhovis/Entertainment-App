"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInForm from "../../components/SignInForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../components/SignInForm.module.css";

const SignInPage = () => {
    const CustomRedirect = () => {
        const router = useRouter();

        useEffect(() => {
            router.push("/profile");
        }, [router]);

        return null;
    };

    useEffect(() => {
        document.documentElement.classList.add(styles.signInRoot);
        document.body.classList.add(styles.signInBody);

        return () => {
            document.documentElement.classList.remove(styles.signInRoot);
            document.body.classList.remove(styles.signInBody);
        };
    }, []);

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
};

export default SignInPage;

"use client";

import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SSOCallback = () => {
    const signUpContext = useSignUp();
    const signInContext = useSignIn();
    const router = useRouter();

    useEffect(() => {
        if (!signUpContext.isLoaded && !signInContext.isLoaded) return;

        async function handleCallback() {
            try {
                let result;
                if (signUpContext.signUp) {
                    result =
                        await signUpContext.signUp.attemptEmailAddressVerification();
                } else {
                    result =
                        await signInContext.signIn.attemptEmailAddressVerification();
                }

                if (result.status === "complete") {
                    await (signUpContext.setActive || signInContext.setActive)({
                        session: result.createdSessionId,
                    });
                    router.push("/");
                }
            } catch (err) {
                console.error(JSON.stringify(err, null, 2));
            }
        }

        handleCallback();
    }, [signUpContext, signInContext, router]);

    return null;
};

export default SSOCallback;

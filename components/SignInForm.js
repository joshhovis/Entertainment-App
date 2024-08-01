"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from "./SignInForm.module.css";
import Link from "next/link";

const SignInForm = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const signInAttempt = await signIn.create({
                identifier,
                password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push("/profile");
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const signInWith = async (strategy) => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/profile",
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.loginHeader}>JMDb</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formHeader}>Login</h2>
                <div>
                    <input
                        onChange={(e) => setIdentifier(e.target.value)}
                        id="identifier"
                        name="identifier"
                        type="text"
                        value={identifier}
                        required
                        placeholder="Email address or username"
                    />
                </div>
                <div>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        placeholder="Password"
                    />
                </div>
                <button type="submit">Sign in</button>
                <button
                    type="button"
                    onClick={() => signInWith("oauth_google")}
                >
                    Sign in with Google
                </button>
                <button
                    type="button"
                    onClick={() => signInWith("oauth_github")}
                >
                    Sign in with GitHub
                </button>
                <p>
                    Don't have an account? <Link href="/sign-up">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default SignInForm;

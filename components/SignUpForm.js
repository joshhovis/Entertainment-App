"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpForm = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const signUpAttempt = await signUp.create({
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                username,
                emailAddress: email,
                password,
            });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.push("/profile");
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const signInWith = async (strategy) => {
        if (!isLoaded) return;

        try {
            await signUp.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/profile",
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name (Optional)</label>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name (Optional)</label>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
                <button
                    type="button"
                    onClick={() => signInWith("oauth_google")}
                >
                    Sign up with Google
                </button>
                <button
                    type="button"
                    onClick={() => signInWith("oauth_github")}
                >
                    Sign up with GitHub
                </button>
                <p>
                    Already have an account? <Link href="/sign-in">Login</Link>
                </p>
            </form>
        </>
    );
};

export default SignUpForm;

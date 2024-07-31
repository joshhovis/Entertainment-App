"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

    return (
        <>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="identifier">Enter email or username</label>
                    <input
                        onChange={(e) => setIdentifier(e.target.value)}
                        id="identifier"
                        name="identifier"
                        type="text"
                        value={identifier}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Enter password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                    />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </>
    );
};

export default SignInForm;

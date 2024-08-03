"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from "./SignInForm.module.css";
import Link from "next/link";
import googleIcon from "../public/images/google.svg";
import githubIcon from "../public/images/github.svg";
import Image from "next/image";

const SignInForm = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
                router.push("/");
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            const errorCode = err.errors?.[0]?.code;
            switch (errorCode) {
                case "form_password_incorrect":
                    setError("Password is incorrect. Please try again");
                    break;
                case "form_param_format_invalid":
                    setError("Email format is incorrect. Please try again");
                    break;
                case "form_identifier_not_found":
                    setError("No account found with that email or username");
                    break;
                default:
                    setError("An unexpected error occured. Please try again");
                    break;
            }
        }
    };

    const signInWith = async (strategy) => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.loginHeader}>
                <Link href="/">JMDb</Link>
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formHeader}>Login</h2>
                <div className={styles.socialConnectors}>
                    <Image
                        onClick={() => signInWith("oauth_google")}
                        className={styles.socialConnectorsIcon}
                        src={googleIcon}
                        alt="Google icon"
                    />
                    <Image
                        onClick={() => signInWith("oauth_github")}
                        className={styles.socialConnectorsIcon}
                        src={githubIcon}
                        alt="Github icon"
                    />
                </div>
                <div className={styles.separator}>
                    <div className={styles.separatorLine}></div>
                    <p className={styles.separatorText}>or</p>
                    <div className={styles.separatorLine}></div>
                </div>
                <div>
                    <input
                        className={styles.formInput}
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
                        className={styles.formInput}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        placeholder="Password"
                    />
                    {error && <p className={styles.passwordError}>{error}</p>}
                </div>
                <button className={styles.formSubmit} type="submit">
                    Login to your account
                </button>
                <p className={styles.formFooter}>
                    Don't have an account? <Link href="/sign-up">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default SignInForm;

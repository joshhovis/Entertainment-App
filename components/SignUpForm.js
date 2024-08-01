"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from "./SignUpForm.module.css";
import Link from "next/link";
import googleIcon from "../public/images/google.svg";
import githubIcon from "../public/images/github.svg";
import Image from "next/image";

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
                router.push("/");
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
                redirectUrlComplete: "/",
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div className={styles.signup}>
            <h1 className={styles.signupHeader}>
                <Link href="/">JMDb</Link>
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formHeader}>Sign Up</h2>
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
                        alt="GitHub icon"
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
                        onChange={(e) => setFirstName(e.target.value)}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        placeholder="First Name (Optional)"
                    />
                </div>
                <div>
                    <input
                        className={styles.formInput}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        placeholder="Last Name (Optional)"
                    />
                </div>
                <div>
                    <input
                        className={styles.formInput}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        required
                        placeholder="Username"
                    />
                </div>
                <div>
                    <input
                        className={styles.formInput}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        required
                        placeholder="Email"
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
                </div>
                <button className={styles.formSubmit} type="submit">
                    Sign Up
                </button>
                <p className={styles.formFooter}>
                    Already have an account? <Link href="/sign-in">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;

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
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);
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

            if (signUpAttempt.status !== "complete") {
                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });
                setShowVerification(true);
            } else {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.push("/");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: verificationCode,
                }
            );

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
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
            {showVerification ? (
                <form className={styles.form} onSubmit={handleVerification}>
                    <h2 className={styles.formHeader}>Verify Email</h2>
                    <div>
                        <input
                            className={styles.formInput}
                            onChange={(e) =>
                                setVerificationCode(e.target.value)
                            }
                            id="verificationCode"
                            name="verificationCode"
                            type="text"
                            value={verificationCode}
                            required
                            placeholder="Enter verification code"
                        />
                    </div>
                    <button className={styles.formSubmit} type="submit">
                        Verify Email
                    </button>
                </form>
            ) : (
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
                            placeholder="Username (Optional)"
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
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                        />
                        {isFocused && password.length < 8 && (
                            <p className={styles.focusedText}>
                                Password must be at least 8 characters
                            </p>
                        )}
                    </div>
                    <button className={styles.formSubmit} type="submit">
                        Sign Up
                    </button>
                    <p className={styles.formFooter}>
                        Already have an account?{" "}
                        <Link href="/sign-in">Login</Link>
                    </p>
                </form>
            )}
        </div>
    );
};

export default SignUpForm;

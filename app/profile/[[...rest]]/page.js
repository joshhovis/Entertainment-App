"use client";

import {
    UserProfile,
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    useClerk,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect, useRef } from "react";
import "../profile.css";
// import HomeIcon from "@/public/svgs/homeIcon";

const ProfilePage = () => {
    const navbarRef = useRef(null);
    const { signOut } = useClerk();

    // Wait for the DOM to be fully loaded
    useEffect(() => {
        const interval = setInterval(() => {
            const navbarBanner = document.querySelector(
                ".cl-navbarMobileMenuRow"
            );
            if (navbarBanner) {
                navbarRef.current = navbarBanner;
                clearInterval(interval);

                const button = document.createElement("button");
                button.className = "signoutButton";
                button.textContent = "Sign out";

                navbarBanner.append(button);
                button.addEventListener("click", () => {
                    signOut();
                });

                const navbar = document.querySelector(".cl-navbar");
                if (window.innerWidth >= 1024) {
                    navbar.append(button);
                }
            }

            const cardBody = document.querySelector(".cl-scrollBox");
            if (cardBody) {
                const homeIcon = document.createElement("a");
                homeIcon.className = "homeIcon";
                homeIcon.textContent = "JMDb";
                homeIcon.href = "/";

                cardBody.append(homeIcon);
            }
        }, 100);

        document.documentElement.classList.add("profileRoot");
        document.body.classList.add("profileBody");
        return () => {
            document.documentElement.classList.remove("profileRoot");
            document.body.classList.remove("profileBody");

            // Cleanup interval on component unmount
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <SignedIn>
                <UserProfile
                    appearance={{
                        baseTheme: dark,
                    }}
                    routing="path"
                    path="/profile"
                >
                    <UserProfile.Page label="security" />
                    {/* <UserProfile.Link
                        label="Home"
                        url="/"
                        labelIcon={<HomeIcon />}
                    /> */}
                </UserProfile>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};

export default ProfilePage;

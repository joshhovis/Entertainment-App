import {
    UserProfile,
    SignOutButton,
    RedirectToSignIn,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs";

export default function ProfilePage() {
    return (
        <>
            <SignedIn>
                <UserProfile />
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

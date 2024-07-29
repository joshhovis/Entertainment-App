import "../styles/globals.css";

export const metadata = {
    title: "Entertainment Web App",
    description: "A Frontend Mentor challenge - NextJS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

import "../styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Entertainment Web App",
    description: "A Frontend Mentor challenge - NextJS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <Footer />
            </body>
        </html>
    );
}

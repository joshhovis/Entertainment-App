import "../styles/globals.css";
import Footer from "../components/Footer";
import ClientWrapper from "../components/ClientWrapper";

export const metadata = {
    title: "Entertainment Web App",
    description: "A Frontend Mentor challenge - NextJS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClientWrapper>{children}</ClientWrapper>
                <Footer />
            </body>
        </html>
    );
}

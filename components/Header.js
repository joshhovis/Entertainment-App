import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => (
    <header>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/tv-series">TV Series</Link>
            <Link href="/bookmarked">Bookmarked</Link>
        </nav>
    </header>
);

export default Header;

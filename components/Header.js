import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.svg";
import profilePic from "../public/images/image-avatar.png";
import homeIcon from "../public/images/icon-nav-home.svg";
import moviesIcon from "../public/images/icon-nav-movies.svg";
import tvSeriesIcon from "../public/images/icon-nav-tv-series.svg";
import bookmarkIcon from "../public/images/icon-nav-bookmark.svg";

const Header = ({ onLogoClick }) => (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <Image className={styles.logo} src={logo} alt="Logo" />

            <div className={styles.icons}>
                <Link href="/" onClick={onLogoClick}>
                    <Image
                        className={styles.icon}
                        src={homeIcon}
                        alt="Home Icon"
                    />
                </Link>
                <Link href="/movies" onClick={onLogoClick}>
                    <Image
                        className={styles.icon}
                        src={moviesIcon}
                        alt="Movies Icon"
                    />
                </Link>
                <Link href="/tv-series" onClick={onLogoClick}>
                    <Image
                        className={styles.icon}
                        src={tvSeriesIcon}
                        alt="TV Series Icon"
                    />
                </Link>
                <Link href="/bookmarked" onClick={onLogoClick}>
                    <Image
                        className={styles.icon}
                        src={bookmarkIcon}
                        alt="Bookmark Icon"
                    />
                </Link>
            </div>

            <Image
                className={styles.user}
                src={profilePic}
                alt="User profile"
            />
        </nav>
    </header>
);

export default Header;

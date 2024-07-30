import styles from "./SearchBar.module.css";
import searchIcon from "../public/images/icon-search.svg";
import Image from "next/image";

const SearchBar = ({ query, setQuery, type }) => {
    const getPlaceholderText = () => {
        switch (type) {
            case "home":
                return "Search for movies or TV series";
            case "Movie":
                return "Search for movies";
            case "TV Series":
                return "Search for TV series";
            case "bookmarked":
                return "Search your bookmarks";
            default:
                return "Search for movies or TV series";
        }
    };

    return (
        <div className={styles.searchBar}>
            <Image src={searchIcon} alt="Search icon" />
            <input
                className={styles.searchInput}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={getPlaceholderText()}
            />
        </div>
    );
};

export default SearchBar;

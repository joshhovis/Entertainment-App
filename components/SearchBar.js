import styles from "./SearchBar.module.css";
import searchIcon from "../public/images/icon-search.svg";
import Image from "next/image";

const SearchBar = ({ query, setQuery }) => {
    return (
        <div className={styles.searchBar}>
            <Image src={searchIcon} alt="Search icon" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies or TV series"
            />
        </div>
    );
};

export default SearchBar;

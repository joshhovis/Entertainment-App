import styles from "./SearchBar.module.css";
import searchIcon from "../public/images/icon-search.svg";
import Image from "next/image";

const SearchBar = ({ query, setQuery, onSearch }) => {
    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles.searchBar}>
            <Image src={searchIcon} alt="Search icon" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies or TV series"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;

import { useState, useEffect } from "react";
import styles from "./FilterSort.module.css";

const FilterSort = ({ onFilterChange, type, onGenresFetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(
                type === "movie"
                    ? "https://api.themoviedb.org/3/genre/movie/list"
                    : "https://api.themoviedb.org/3/genre/tv/list",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
                        "Content-Type": "application/json;charset=utf-8",
                    },
                }
            );
            const data = await response.json();
            setGenres(data.genres);
            onGenresFetch(data.genres);
        };

        fetchGenres();
    }, [type, onGenresFetch]);

    const handleFilterClick = (filter) => {
        let updatedFilters;
        if (selectedFilters.includes(filter)) {
            updatedFilters = selectedFilters.filter((item) => item !== filter);
        } else {
            updatedFilters = [...selectedFilters, filter];
        }
        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className={styles.filterSort}>
            <button
                className={styles.filterButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>Filters</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="glyphicons-basic"
                    viewBox="0 0 32 32"
                >
                    <path
                        fill="currentColor"
                        id="chevron-right"
                        d="M23.32849,16.70709,13.12115,26.91425a.50007.50007,0,0,1-.70715,0l-2.82806-2.8285a.5.5,0,0,1,0-.70709L16.96436,16,9.58594,8.62134a.5.5,0,0,1,0-.70709L12.414,5.08575a.50007.50007,0,0,1,.70715,0L23.32849,15.29291A.99988.99988,0,0,1,23.32849,16.70709Z"
                    />
                </svg>
            </button>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    <p className={styles.dropdownTitle}>Genres</p>
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            className={`${styles.dropdownItem} ${
                                selectedFilters.includes(genre.name)
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => handleFilterClick(genre.name)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterSort;

"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import FilterSort from "./FilterSort";
import Fuse from "fuse.js";
import {
    fetchTrendingData,
    fetchMoviesData,
    fetchTVData,
} from "../utils/fetchData";

const Content = ({ type }) => {
    const [data, setData] = useState([]);
    const [trendingData, setTrendingData] = useState([]);
    const [nonTrendingData, setNonTrendingData] = useState([]);
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        loop: true,
    });
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [visibleItems, setVisibleItems] = useState(30);
    const [filter, setFilter] = useState([]);
    const [genres, setGenres] = useState([]);

    const fuse = new Fuse(data, {
        keys: ["title", "name"],
        threshold: 0.3,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedData = [];
                const page = Math.ceil(visibleItems / 25);

                if (type === "home") {
                    const [trending, movies, tvShows] = await Promise.all([
                        fetchTrendingData(page),
                        fetchMoviesData(page),
                        fetchTVData(page),
                    ]);

                    if (
                        Array.isArray(trending) &&
                        Array.isArray(movies) &&
                        Array.isArray(tvShows)
                    ) {
                        fetchedData = [
                            ...trending.map((item) => ({
                                ...item,
                                media_type: item.media_type,
                            })),
                            ...movies.map((item) => ({
                                ...item,
                                media_type: "movie",
                            })),
                            ...tvShows.map((item) => ({
                                ...item,
                                media_type: "tv",
                            })),
                        ];
                    } else {
                        console.error(
                            "Error: One of the fetched data arrays is not an array."
                        );
                    }

                    fetchedData = fetchedData.filter(
                        (item) => item.poster_path
                    );

                    const uniqueFetchedData = Array.from(
                        new Set(
                            [...data, ...fetchedData].map((item) => item.id)
                        )
                    ).map((id) =>
                        [...data, ...fetchedData].find((item) => item.id === id)
                    );

                    setTrendingData(uniqueFetchedData.slice(0, 5));
                    setNonTrendingData(
                        uniqueFetchedData.slice(5, visibleItems + 5)
                    );
                    setData(uniqueFetchedData);
                    setSearchResults(
                        uniqueFetchedData.slice(5, visibleItems + 5)
                    );
                } else if (type === "movie") {
                    fetchedData = (await fetchMoviesData(page)).map((item) => ({
                        ...item,
                        media_type: "movie",
                    }));

                    fetchedData = fetchedData.filter(
                        (item) => item.poster_path
                    );

                    const uniqueFetchedData = Array.from(
                        new Set(
                            [...data, ...fetchedData].map((item) => item.id)
                        )
                    )
                        .map((id) =>
                            [...data, ...fetchedData].find(
                                (item) => item.id === id
                            )
                        )
                        .slice(0, visibleItems);

                    setData(uniqueFetchedData);
                    setSearchResults(uniqueFetchedData);
                } else if (type === "tv") {
                    fetchedData = (await fetchTVData(page)).map((item) => ({
                        ...item,
                        media_type: "tv",
                    }));

                    fetchedData = fetchedData.filter(
                        (item) => item.poster_path || item.backdrop_path
                    );

                    const uniqueFetchedData = Array.from(
                        new Set(
                            [...data, ...fetchedData].map((item) => item.id)
                        )
                    )
                        .map((id) =>
                            [...data, ...fetchedData].find(
                                (item) => item.id === id
                            )
                        )
                        .slice(0, visibleItems);

                    setData(uniqueFetchedData);
                    setSearchResults(uniqueFetchedData);
                } else if (type === "bookmarked") {
                    const [trending, movies, tvShows] = await Promise.all([
                        fetchTrendingData(page),
                        fetchMoviesData(page),
                        fetchTVData(page),
                    ]);

                    if (
                        Array.isArray(trending) &&
                        Array.isArray(movies) &&
                        Array.isArray(tvShows)
                    ) {
                        fetchedData = [
                            ...trending.map((item) => ({
                                ...item,
                                media_type: item.media_type,
                            })),
                            ...movies.map((item) => ({
                                ...item,
                                media_type: "movie",
                            })),
                            ...tvShows.map((item) => ({
                                ...item,
                                media_type: "tv",
                            })),
                        ];
                    } else {
                        console.error(
                            "Error: One of the fetched data arrays is not an array."
                        );
                    }

                    fetchedData = fetchedData.filter(
                        (item) => item.poster_path
                    );

                    const savedBookmarks =
                        JSON.parse(localStorage.getItem("bookmarks")) || [];

                    const bookmarked = fetchedData.filter((item) =>
                        savedBookmarks.includes(item.id)
                    );

                    const uniqueBookmarked = Array.from(
                        new Set([...data, ...bookmarked].map((item) => item.id))
                    ).map((id) =>
                        [...data, ...bookmarked].find((item) => item.id === id)
                    );

                    setData(uniqueBookmarked);
                    setSearchResults(uniqueBookmarked);
                }

                setBookmarks(
                    JSON.parse(localStorage.getItem("bookmarks")) || []
                );
            } catch (error) {
                console.error("Error fetching data from API:", error);
            }
        };

        fetchData();
    }, [type, visibleItems]);

    useEffect(() => {
        if (searchQuery === "") {
            resetSearchResults();
        } else {
            const results = fuse.search(searchQuery).map(({ item }) => item);
            setSearchResults(results);
            setIsSearching(true);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (filter.length === 0) {
            setSearchResults(data);
        } else {
            const filteredResults = data.filter((item) =>
                filter.every((f) =>
                    item.genre_ids.includes(genres.find((g) => g.name === f).id)
                )
            );
            setSearchResults(filteredResults);
        }
    }, [filter, data, genres]);

    const resetSearchResults = () => {
        if (type === "home") {
            setSearchResults(nonTrendingData);
        } else if (type === "bookmarked") {
            setSearchResults(
                data.filter((item) => bookmarks.includes(item.id))
            );
        } else {
            setSearchResults(data);
        }
        setIsSearching(false);
    };

    const resetSearch = () => {
        setSearchQuery("");
        resetSearchResults();
    };

    const toggleBookmark = (id, mediaType) => {
        const updatedBookmarks = bookmarks.includes(id)
            ? bookmarks.filter((bookmarkId) => bookmarkId !== id)
            : [...bookmarks, id];

        setBookmarks(updatedBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

        const updatedData = data.map((item) =>
            item.id === id
                ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        );
        setData(updatedData);

        if (type === "bookmarked") {
            setSearchResults(
                updatedData.filter((item) => updatedBookmarks.includes(item.id))
            );
        }
    };

    const getHeaderText = () => {
        if (isSearching) {
            return `Found ${searchResults.length} results for "${searchQuery}"`;
        }
        switch (type) {
            case "home":
                return "Recommended for you";
            case "movie":
                return "Movies";
            case "tv":
                return "TV Series";
            case "bookmarked":
                return "Bookmarked Movies";
            default:
                return "Recommended for you";
        }
    };

    const bookmarkedMovies = searchResults.filter(
        (item) => item.media_type === "movie"
    );
    const bookmarkedTVSeries = searchResults.filter(
        (item) => item.media_type === "tv"
    );

    const handleViewMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 25);

        if (isSearching) {
            const results = fuse.search(searchQuery).map(({ item }) => item);
            setSearchResults((prevResults) => [
                ...prevResults,
                ...results.slice(prevResults.length, prevResults.length + 25),
            ]);
        } else {
            setSearchResults((prevResults) => [
                ...prevResults,
                ...data.slice(prevResults.length, prevResults.length + 25),
            ]);
        }
    };

    return (
        <div className={styles.bodyWrapper}>
            <Header onLogoClick={resetSearch} type={type} />
            <div className={styles.cardWrapper}>
                <SearchBar
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    type={type}
                />
                {type === "home" && !isSearching && (
                    <div className={styles.trending}>
                        <h2>Trending</h2>
                        <div className={styles.embla} ref={emblaRef}>
                            <div className={styles.emblaContainer}>
                                {trendingData.map((item) => (
                                    <div
                                        className={styles.emblaSlide}
                                        key={item.id}
                                    >
                                        <CardTrending
                                            item={item}
                                            toggleBookmark={toggleBookmark}
                                            isBookmarked={bookmarks.includes(
                                                item.id
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.pageTitle}>
                    {(type === "movie" || type === "tv") && (
                        <FilterSort
                            onFilterChange={setFilter}
                            type={type}
                            onGenresFetch={setGenres}
                        />
                    )}
                    <h2>{getHeaderText()}</h2>
                </div>
                {type === "bookmarked" ? (
                    <div className={styles.bookmarks}>
                        <div className={styles.bookmarksListWrapper}>
                            <div className={styles.bookmarkedList}>
                                {bookmarkedMovies.map((item) => (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.id
                                        )}
                                        mediaType="movie"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.bookmarksListWrapper}>
                            {!isSearching && <h2>Bookmarked TV Series</h2>}
                            <div className={styles.bookmarkedList}>
                                {bookmarkedTVSeries.map((item) => (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.id
                                        )}
                                        mediaType="tv"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.homeList}>
                        {searchResults.map((item) => (
                            <Card
                                key={item.id}
                                item={item}
                                toggleBookmark={toggleBookmark}
                                isBookmarked={bookmarks.includes(item.id)}
                                mediaType={item.media_type}
                            />
                        ))}
                    </div>
                )}
                <button onClick={handleViewMore} className={styles.viewMore}>
                    View More
                </button>
            </div>
        </div>
    );
};

export default Content;

"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";
import SearchBar from "./SearchBar";
import Header from "./Header";
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

    const fuse = new Fuse(data, {
        keys: ["title", "name"],
        threshold: 0.3,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedData = [];
                if (type === "home" || type === "bookmarked") {
                    const [trending, movies, tvShows] = await Promise.all([
                        fetchTrendingData(),
                        fetchMoviesData(),
                        fetchTVData(),
                    ]);
                    fetchedData = [...trending, ...movies, ...tvShows];
                } else if (type === "movie") {
                    fetchedData = await fetchMoviesData();
                } else if (type === "tv") {
                    fetchedData = await fetchTVData();
                }

                const savedBookmarks =
                    JSON.parse(localStorage.getItem("bookmarks")) || [];

                if (type === "home") {
                    setTrendingData(fetchedData.slice(0, 5));
                    setNonTrendingData(fetchedData.slice(5, 30));
                    setData(fetchedData);
                    setSearchResults(fetchedData.slice(5, 30));
                } else if (type === "bookmarked") {
                    const bookmarked = fetchedData.filter((item) =>
                        savedBookmarks.includes(item.id)
                    );
                    setData(bookmarked);
                    setSearchResults(bookmarked);
                } else {
                    const filtered = fetchedData.slice(0, 30);
                    setData(filtered);
                    setSearchResults(filtered);
                }

                setBookmarks(savedBookmarks);
            } catch (error) {
                console.error("Error fetching data from API:", error);
            }
        };

        fetchData();
    }, [type]);

    useEffect(() => {
        if (searchQuery === "") {
            resetSearchResults();
        } else {
            const results = fuse.search(searchQuery).map(({ item }) => item);
            setSearchResults(results);
            setIsSearching(true);
        }
    }, [searchQuery]);

    const resetSearchResults = () => {
        if (type === "home") {
            setSearchResults(nonTrendingData);
        } else if (type === "bookmarked") {
            const bookmarkedResults = data.filter((item) =>
                bookmarks.includes(item.id)
            );
            setSearchResults(bookmarkedResults);
        } else {
            setSearchResults(data);
        }
        setIsSearching(false);
    };

    const resetSearch = () => {
        setSearchQuery("");
        resetSearchResults();
    };

    const toggleBookmark = (id) => {
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
            const updatedSearchResults = updatedData.filter((item) =>
                updatedBookmarks.includes(item.id)
            );
            setSearchResults(updatedSearchResults);
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
                                {trendingData.map((item, index) => (
                                    <div
                                        className={styles.emblaSlide}
                                        key={`${item.id}-${index}`}
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

                <h2>{getHeaderText()}</h2>
                {type === "bookmarked" ? (
                    <div className={styles.bookmarks}>
                        <div className={styles.bookmarksListWrapper}>
                            <div className={styles.bookmarkedList}>
                                {bookmarkedMovies.map((item, index) => (
                                    <Card
                                        key={`${item.id}-${index}`}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.id
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.bookmarksListWrapper}>
                            {!isSearching && <h2>Bookmarked TV Series</h2>}
                            <div className={styles.bookmarkedList}>
                                {bookmarkedTVSeries.map((item, index) => (
                                    <Card
                                        key={`${item.id}-${index}`}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.id
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.homeList}>
                        {searchResults.map((item, index) => (
                            <Card
                                key={`${item.id}-${index}`}
                                item={item}
                                toggleBookmark={toggleBookmark}
                                isBookmarked={bookmarks.includes(item.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;

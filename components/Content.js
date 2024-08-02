"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import Fuse from "fuse.js";
import { fetchTrendingData } from "../utils/fetchData";

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
                const trending = await fetchTrendingData();
                const savedBookmarks =
                    JSON.parse(localStorage.getItem("bookmarks")) || [];

                if (type === "home") {
                    setTrendingData(trending.slice(0, 5));
                    setNonTrendingData(trending.slice(5, 30));
                    setData(trending);
                    setSearchResults(trending.slice(5, 30));
                } else if (type === "bookmarked") {
                    const bookmarked = trending.filter((item) =>
                        savedBookmarks.includes(item.title || item.name)
                    );
                    setData(bookmarked);
                    setSearchResults(bookmarked);
                } else {
                    const filtered = trending.filter(
                        (item) => item.media_type === type.toLowerCase()
                    );
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
            setSearchResults(
                data.filter((item) =>
                    bookmarks.includes(item.title || item.name)
                )
            );
        } else {
            setSearchResults(
                data.filter((item) => item.media_type === type.toLowerCase())
            );
        }
        setIsSearching(false);
    };

    const resetSearch = () => {
        setSearchQuery("");
        resetSearchResults();
    };

    const toggleBookmark = (title) => {
        const updatedBookmarks = bookmarks.includes(title)
            ? bookmarks.filter((bookmarkTitle) => bookmarkTitle !== title)
            : [...bookmarks, title];

        setBookmarks(updatedBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

        const updatedData = data.map((item) =>
            item.title === title || item.name === title
                ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        );
        setData(updatedData);

        if (type === "bookmarked") {
            setSearchResults(
                updatedData.filter((item) =>
                    updatedBookmarks.includes(item.title || item.name)
                )
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
                                                item.title || item.name
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
                                {bookmarkedMovies.map((item) => (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.title || item.name
                                        )}
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
                                            item.title || item.name
                                        )}
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
                                isBookmarked={bookmarks.includes(
                                    item.title || item.name
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;

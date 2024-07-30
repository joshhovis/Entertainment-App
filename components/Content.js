"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import Fuse from "fuse.js";

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
        keys: ["title"],
        threshold: 0.3,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/data.json");
            const result = await response.json();

            const savedBookmarks =
                JSON.parse(localStorage.getItem("bookmarks")) || [];

            if (type === "home") {
                const trending = result.filter((item) => item.isTrending);
                const nonTrending = result.filter((item) => !item.isTrending);
                setTrendingData(trending);
                setNonTrendingData(nonTrending);
                setData(result);
                setSearchResults(nonTrending);
            } else if (type === "bookmarked") {
                const bookmarked = result.filter((item) =>
                    savedBookmarks.includes(item.title)
                );
                setData(bookmarked);
                setSearchResults(bookmarked);
            } else {
                const filtered = result.filter(
                    (item) => item.category === type
                );
                setData(filtered);
                setSearchResults(filtered);
            }

            setBookmarks(savedBookmarks);
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
                data.filter((item) => bookmarks.includes(item.title))
            );
        } else {
            setSearchResults(data.filter((item) => item.category === type));
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
            item.title === title
                ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        );
        setData(updatedData);

        if (type === "bookmarked") {
            setSearchResults(
                updatedData.filter((item) =>
                    updatedBookmarks.includes(item.title)
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
            case "Movie":
                return "Movies";
            case "TV Series":
                return "TV Series";
            default:
                return "Recommended for you";
        }
    };

    const bookmarkedMovies = searchResults.filter(
        (item) => item.category === "Movie"
    );
    const bookmarkedTVSeries = searchResults.filter(
        (item) => item.category === "TV Series"
    );

    return (
        <>
            <Header onLogoClick={resetSearch} />
            <div className={styles.cardWrapper}>
                <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                {type === "home" && !isSearching && (
                    <div className={styles.trending}>
                        <h2>Trending</h2>
                        <div className={styles.embla} ref={emblaRef}>
                            <div className={styles.emblaContainer}>
                                {trendingData.map((item) => (
                                    <div
                                        className={styles.emblaSlide}
                                        key={item.title}
                                    >
                                        <CardTrending
                                            item={item}
                                            toggleBookmark={toggleBookmark}
                                            isBookmarked={bookmarks.includes(
                                                item.title
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {type === "bookmarked" ? (
                    <div className={styles.bookmarks}>
                        <div className={styles.bookmarksListWrapper}>
                            <h2>Bookmarked Movies</h2>
                            <div className={styles.bookmarkedList}>
                                {bookmarkedMovies.map((item) => (
                                    <Card
                                        key={item.title}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.title
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.bookmarksListWrapper}>
                            <h2>Bookmarked TV Series</h2>
                            <div className={styles.bookmarkedList}>
                                {bookmarkedTVSeries.map((item) => (
                                    <Card
                                        key={item.title}
                                        item={item}
                                        toggleBookmark={toggleBookmark}
                                        isBookmarked={bookmarks.includes(
                                            item.title
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>{getHeaderText()}</h2>
                        <div className={styles.homeList}>
                            {searchResults.map((item) => (
                                <Card
                                    key={item.title}
                                    item={item}
                                    toggleBookmark={toggleBookmark}
                                    isBookmarked={bookmarks.includes(
                                        item.title
                                    )}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Content;

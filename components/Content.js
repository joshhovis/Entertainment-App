"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";
import SearchBar from "./SearchBar";
import Header from "./Header";

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/data.json");
            const result = await response.json();

            if (type === "home") {
                const trending = result.filter((item) => item.isTrending);
                const nonTrending = result.filter((item) => !item.isTrending);
                setTrendingData(trending);
                setNonTrendingData(nonTrending);
                setData(result);
                setSearchResults(nonTrending);
            } else if (type === "bookmarked") {
                const bookmarked = result.filter((item) => item.isBookmarked);
                setData(bookmarked);
                setSearchResults(bookmarked);
            } else {
                const filtered = result.filter(
                    (item) => item.category === type
                );
                setData(filtered);
                setSearchResults(filtered);
            }
        };

        fetchData();
    }, [type]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setIsSearching(true);
        if (query === "") {
            resetSearchResults();
        } else {
            const filteredResults = data.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };

    const resetSearchResults = () => {
        if (type === "home") {
            setSearchResults(nonTrendingData);
        } else if (type === "bookmarked") {
            setSearchResults(data.filter((item) => item.isBookmarked));
        } else {
            setSearchResults(data.filter((item) => item.category === type));
        }
        setIsSearching(false);
    };

    const resetSearch = () => {
        setSearchQuery("");
        resetSearchResults();
    };

    return (
        <>
            <Header onLogoClick={resetSearch} />
            <div className={styles.cardWrapper}>
                <SearchBar
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    onSearch={handleSearch}
                />
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
                                        <CardTrending item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <h2>
                    {isSearching
                        ? `Found ${searchResults.length} results for "${searchQuery}"`
                        : "Recommended for you"}
                </h2>
                <div className={styles.homeList}>
                    {searchResults.map((item) => (
                        <Card key={item.title} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Content;

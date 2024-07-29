"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";
import CardTrending from "./CardTrending";
import useEmblaCarousel from "embla-carousel-react";

const Content = ({ type }) => {
    const [data, setData] = useState([]);
    const [trendingData, setTrendingData] = useState([]);
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        loop: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/data.json");
            const result = await response.json();

            if (type === "home") {
                setTrendingData(result.filter((item) => item.isTrending));
                setData(result.filter((item) => !item.isTrending));
            } else if (type === "bookmarked") {
                setData(result.filter((item) => item.isBookmarked));
            } else {
                setData(result.filter((item) => item.category === type));
            }
        };

        fetchData();
    }, [type]);

    return (
        <div className={styles.cardWrapper}>
            {type === "home" && (
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

            <h2>Recommended for you</h2>
            <div className={styles.homeList}>
                {data.map((item) => (
                    <Card key={item.title} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Content;

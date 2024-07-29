"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Content.module.css";

const Content = ({ type }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/data.json");
            const result = await response.json();

            let filteredData = [];
            if (type === "home") filteredData = result;
            else if (type === "bookmarked")
                filteredData = result.filter((item) => item.isBookmarked);
            else filteredData = result.filter((item) => item.category === type);

            setData(filteredData);
        };

        fetchData();
    }, [type]);

    return (
        <div className={styles.cardWrapper}>
            {data.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
};

export default Content;

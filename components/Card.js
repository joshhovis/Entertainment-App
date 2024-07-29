import styles from "./Card.module.css";
import bookmarkEmpty from "../public/images/icon-bookmark-empty.svg";
import bookmarkFull from "../public/images/icon-bookmark-full.svg";
import Image from "next/image";
import { useState } from "react";

const Card = ({ item }) => {
    const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);

    return (
        <div className={styles.card}>
            <div className={styles.cardImages}>
                <img
                    className={styles.cardPreview}
                    src={item.thumbnail.regular.small}
                    alt={`${item.title} preview`}
                />
                <div className={styles.cardBookmarkWrapper}>
                    <Image
                        className={styles.cardBookmark}
                        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt="bookmark icon"
                    />
                </div>
            </div>
            <div className={styles.cardText}>
                <div className={styles.cardSubtext}>
                    <p className={styles.cardYear}>{item.year} </p>
                    <p className={styles.cardCategory}>{item.category} </p>
                    <p className={styles.cardRating}>{item.rating} </p>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
        </div>
    );
};

export default Card;

import styles from "./CardTrending.module.css";
import bookmarkEmpty from "../public/images/icon-bookmark-empty.svg";
import bookmarkFull from "../public/images/icon-bookmark-full.svg";
import Image from "next/image";

const CardTrending = ({ item, toggleBookmark, isBookmarked }) => {
    return (
        <div
            className={styles.card}
            style={{ backgroundImage: `url(${item.thumbnail.trending.large})` }}
        >
            <div className={styles.overlay}>
                <button
                    className={styles.cardBookmarkWrapper}
                    onClick={() => toggleBookmark(item.title)}
                >
                    <Image
                        className={styles.cardBookmark}
                        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt="bookmark icon"
                    />
                </button>
                <div className={styles.cardText}>
                    <div className={styles.cardInfo}>
                        <p className={styles.cardYear}>{item.year} </p>
                        <p className={styles.cardCategory}>{item.category} </p>
                    </div>
                    <div className={styles.cardRatingWrapper}>
                        <p className={styles.cardRating}>{item.rating} </p>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default CardTrending;

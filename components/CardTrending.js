import styles from "./CardTrending.module.css";
import Image from "next/image";
import movieIcon from "../public/images/icon-category-movie.svg";
import tvIcon from "../public/images/icon-category-tv.svg";
import { motion } from "framer-motion";
import { cardVariants } from "@/animations/variants";

const CardTrending = ({ item, toggleBookmark, isBookmarked }) => {
    let ratingPercent = `${Math.round(item.vote_average * 10)}%`;

    return (
        <motion.div
            className={styles.card}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={cardVariants}
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
            }}
        >
            <div className={styles.overlay}>
                <button
                    className={styles.cardBookmarkWrapper}
                    onClick={() => toggleBookmark(item.id, item.media_type)}
                >
                    {isBookmarked ? (
                        <svg
                            className={`${styles.cardBookmark} ${styles.active}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className={styles.cardBookmark}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    )}
                </button>
                <div className={styles.cardText}>
                    <div className={styles.cardInfo}>
                        <p className={styles.cardYear}>
                            {item.release_date?.split("-")[0] || "N/A"}{" "}
                        </p>
                        <div className={styles.cardCategoryWrapper}>
                            <p className={styles.cardIconWrapper}>
                                <Image
                                    className={styles.cardIcon}
                                    src={
                                        item.media_type === "movie"
                                            ? movieIcon
                                            : tvIcon
                                    }
                                    alt={
                                        item.media_type === "movie"
                                            ? "Movie icon"
                                            : "TV Series icon"
                                    }
                                />
                            </p>
                            <p className={styles.cardCategory}>
                                {item.media_type === "movie"
                                    ? "Movie"
                                    : "TV Series"}{" "}
                            </p>
                        </div>
                    </div>
                    <div className={styles.cardRatingWrapper}>
                        <p className={styles.cardRating}>{ratingPercent} </p>
                    </div>
                    <h3 className={styles.cardTitle}>
                        {item.title || item.name}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default CardTrending;

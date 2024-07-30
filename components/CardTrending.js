import styles from "./CardTrending.module.css";

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
                    {isBookmarked ? (
                        <svg
                            className={`${styles.cardBookmark} ${styles.active}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    ) : (
                        <svg
                            className={styles.cardBookmark}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    )}
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

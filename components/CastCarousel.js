"use client";

import { useEffect } from "react";
import styles from "./CastCarousel.module.css";
import Link from "next/link";

const CastCarousel = ({ credits, movieId }) => {
    useEffect(() => {
        const pointerScroll = (e) => {
            const dragStart = (ev) => e.setPointerCapture(ev.pointerId);
            const dragEnd = (ev) => e.releasePointerCapture(ev.pointerId);
            const drag = (ev) =>
                e.hasPointerCapture(ev.pointerId) &&
                (e.scrollLeft -= ev.movementX);

            e.addEventListener("pointerdown", dragStart);
            e.addEventListener("pointerup", dragEnd);
            e.addEventListener("pointermove", drag);
        };

        document.querySelectorAll(`.${styles.cast}`).forEach(pointerScroll);
    }, []);

    return (
        <div className={styles.castWrapper}>
            <h3>Top Billed Cast</h3>
            <div className={styles.cast}>
                <ul className={styles.castList}>
                    {credits.cast.slice(0, 10).map((actor) => (
                        <li className={styles.castItem} key={actor.cast_id}>
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    alt={`${actor.name} headshot`}
                                    draggable="false"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className={styles.castBackupImage}
                                >
                                    <path
                                        fill="#b5b5b5"
                                        d="M27,24.23669V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V24.23669a1.57806,1.57806,0,0,1,.93115-1.36462L10.0672,20.167A5.02379,5.02379,0,0,0,14.55273,23h1.89454a5.02336,5.02336,0,0,0,4.48535-2.83313l5.13623,2.7052A1.57806,1.57806,0,0,1,27,24.23669ZM9.64478,14.12573a2.99143,2.99143,0,0,0,1.31073,1.462l.66583,3.05176A2.99994,2.99994,0,0,0,14.55237,21h1.89526a2.99994,2.99994,0,0,0,2.931-2.36047l.66583-3.05176a2.99115,2.99115,0,0,0,1.31073-1.462l.28-.75146A1.2749,1.2749,0,0,0,21,11.62988V9c0-3-2-5-5.5-5S10,6,10,9v2.62988a1.2749,1.2749,0,0,0-.63519,1.74439Z"
                                    />
                                </svg>
                            )}
                            <div className={styles.castItemText}>
                                <p className={styles.castName}>{actor.name}</p>
                                <p className={styles.castCharacter}>
                                    {actor.character}
                                </p>
                            </div>
                        </li>
                    ))}
                    <li className={styles.viewMore}>
                        <Link href={`${movieId}/cast`}>
                            View More{" "}
                            <span className={styles.viewMoreArrow}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                >
                                    <path
                                        fill="currentColor"
                                        id="arrow-thin-right"
                                        d="M27.12152,16.707,19.35358,24.4751a.5.5,0,0,1-.70716,0L16.525,22.35352a.49983.49983,0,0,1,0-.707L20.17139,18H5a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1H20.17139L16.525,10.35352a.49983.49983,0,0,1,0-.707L18.64642,7.5249a.5.5,0,0,1,.70716,0L27.12152,15.293A.99986.99986,0,0,1,27.12152,16.707Z"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Link className={styles.castLink} href={`${movieId}/cast`}>
                Full Cast & Crew
            </Link>
        </div>
    );
};

export default CastCarousel;

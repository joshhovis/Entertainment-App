import { fetchMovieData } from "@/utils/fetchData";
import styles from "./Movie.module.css";
import Header from "@/components/Header";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const movie = await fetchMovieData(params.movie_id);
    if (!movie || !movie.title) {
        return {
            title: "Movie Not Found",
            description: "Details not available.",
        };
    }
    return { title: movie.title, description: movie.overview };
}

const MovieDetailPage = async ({ params }) => {
    const movie_id = params.movie_id;

    const movie = await fetchMovieData(movie_id);

    const year =
        movie.release_date?.split("-")[0] ||
        movie.first_air_date?.split("-")[0] ||
        "N/A";

    if (!movie) {
        return <p>Movie not found</p>;
    }

    const usReleaseInfo = movie.release_dates?.results?.find(
        (result) => result.iso_3166_1 === "US"
    );

    const usCertification =
        usReleaseInfo?.release_dates?.find(
            (info) => info.certification && info.certification !== ""
        )?.certification || "N/A";

    const credits = movie.credits;

    // Format date to mm/dd/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            timeZone: "UTC",
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    };

    const releaseDate = movie.release_date
        ? formatDate(movie.release_date)
        : "N/A";

    // Format runtime to "(x)h (y)m"
    const formatRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    const runtime = formatRuntime(movie.runtime);

    // Format numbers with commas
    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    const budget = formatNumber(movie.budget);
    const revenue = formatNumber(movie.revenue);

    const genres = movie.genres;

    return (
        <div className={styles.bodyWrapper}>
            <Header />
            <main className={styles.content}>
                <div className={styles.poster}>
                    <div
                        className={styles.imageWrapper}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1000_and_h450_multi_faces${movie.backdrop_path})`,
                        }}
                    >
                        <div className={styles.backgroundGradient}></div>
                        <div className={styles.posterWrapper}>
                            <img
                                className={styles.posterImage}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`Poster of ${movie.title}`}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>

                <h1 className={styles.movieTitle}>
                    {movie.title} <span>({year})</span>
                </h1>

                <div className={styles.movieInfoWrapper}>
                    <div className={styles.movieInfo}>
                        <div className={styles.releaseInfo}>
                            <p className={styles.certification}>
                                {usCertification}
                            </p>
                            <p className={styles.releaseDate}>
                                {releaseDate}{" "}
                                <span>({movie.origin_country[0]})</span>
                            </p>
                            <p className={styles.runtime}>{runtime}</p>
                        </div>
                        <div className={styles.genres}>
                            {genres.map((genre) => (
                                <p key={genre.id}>{genre.name}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.description}>
                    <div className={styles.descriptionHeader}>
                        <span>{movie.tagline}</span>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                    <ul className={styles.descriptionList}>
                        <li>
                            <span>Status</span>
                            <p>{movie.status}</p>
                        </li>
                        <li>
                            <span>Original Language</span>
                            <p>{movie.spoken_languages[0].name}</p>
                        </li>
                        <li>
                            <span>Budget</span>
                            <p>${budget}</p>
                        </li>
                        <li>
                            <span>Revenue</span>
                            <p>${revenue}</p>
                        </li>
                    </ul>
                </div>

                <div className={styles.cast}>
                    <h3>Top Billed Cast</h3>
                    <ul className={styles.castList}>
                        {credits.cast.slice(0, 8).map((actor) => (
                            <li className={styles.castItem} key={actor.cast_id}>
                                {actor.profile_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                        alt={`${actor.name} headshot`}
                                    />
                                )}
                                {!actor.profile_path && (
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
                                    <p className={styles.castName}>
                                        {actor.name}
                                    </p>
                                    <p className={styles.castCharacter}>
                                        {actor.character}
                                    </p>
                                </div>
                            </li>
                        ))}
                        <li className={styles.viewMore}>
                            <Link href={`${params.movie_id}/cast`}>
                                View More{" "}
                                <span className={styles.viewMoreArrow}>
                                    {" "}
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
                    <Link
                        className={styles.castLink}
                        href={`${params.movie_id}/cast`}
                    >
                        Full Cast & Crew
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default MovieDetailPage;

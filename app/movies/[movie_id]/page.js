import { fetchMovieData } from "@/utils/fetchData";
import styles from "./Movie.module.css";
import Header from "@/components/Header";
import Link from "next/link";
import CastCarousel from "@/components/CastCarousel";

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
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
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

                <div className={styles.mainContent}>
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

                    <CastCarousel credits={credits} movieId={params.movie_id} />
                </div>
            </main>
        </div>
    );
};

export default MovieDetailPage;

import { fetchSeriesIdData } from "@/utils/fetchData";
import styles from "./SeriesId.module.css";
import Header from "@/components/Header";
import CastCarousel from "@/components/CastCarousel";

export async function generateMetadata({ params }) {
    const series = await fetchSeriesIdData(params.series_id);
    if (!series || !series.name) {
        return {
            title: "Series Not Found",
            description: "Details not available.",
        };
    }
    return { title: series.name, description: series.overview };
}

const SeriesDetailPage = async ({ params }) => {
    const series_id = params.series_id;

    const series = await fetchSeriesIdData(series_id);

    const year =
        series.release_date?.split("-")[0] ||
        series.first_air_date?.split("-")[0] ||
        "N/A";

    if (!series) {
        return <p>Series not found</p>;
    }

    const usReleaseInfo = series.content_ratings?.results?.find(
        (result) => result.iso_3166_1 === "US"
    );

    const credits = series.credits;
    const genres = series.genres;

    return (
        <div className={styles.bodyWrapper}>
            <Header />
            <main className={styles.content}>
                <div className={styles.poster}>
                    <div
                        className={styles.imageWrapper}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${series.backdrop_path})`,
                        }}
                    >
                        <div className={styles.backgroundGradient}></div>
                        <div className={styles.posterWrapper}>
                            <img
                                className={styles.posterImage}
                                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                                alt={`Poster of ${series.title}`}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <h1 className={styles.movieTitle}>
                        {series.title || series.name} <span>({year})</span>
                    </h1>

                    <div className={styles.movieInfoWrapper}>
                        <div className={styles.movieInfo}>
                            <div className={styles.releaseInfo}>
                                <p className={styles.certification}>
                                    {usReleaseInfo?.rating || ""}
                                </p>
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
                            <span>{series.tagline}</span>
                            <h2>Overview</h2>
                            <p>{series.overview}</p>
                        </div>
                        <ul className={styles.descriptionList}>
                            <li>
                                <span>Status</span>
                                <p>{series.status}</p>
                            </li>
                            <li>
                                <span>Original Language</span>
                                <p>{series.spoken_languages[0]?.name || ""}</p>
                            </li>
                            <li>
                                <span>Type</span>
                                <p>{series.type}</p>
                            </li>
                            <li>
                                <span>Network</span>
                                {series.networks[0]?.logo_path && (
                                    <img
                                        className={styles.networkImage}
                                        src={`https://image.tmdb.org/t/p/w500${series.networks[0].logo_path}`}
                                        alt={`Logo for ${series.networks[0].name}`}
                                        width={100}
                                        height={100}
                                    />
                                )}
                            </li>
                        </ul>
                    </div>

                    <CastCarousel credits={credits} id={params.series_id} />
                </div>
            </main>
        </div>
    );
};

export default SeriesDetailPage;

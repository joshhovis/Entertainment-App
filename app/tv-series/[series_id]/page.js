import {
    fetchSeriesIdData,
    fetchSeriesCredits,
    fetchSeriesContentRatings,
} from "@/utils/fetchData";
import styles from "./SeriesId.module.css";

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

    const [series, credits, contentRatings] = await Promise.all([
        fetchSeriesIdData(series_id),
        fetchSeriesCredits(series_id),
        fetchSeriesContentRatings(series_id),
    ]);

    if (!series) {
        return <p>Series not found</p>;
    }

    return (
        <div>
            <h1>{series.name}</h1>
            <p>{series.overview}</p>
        </div>
    );
};

export default SeriesDetailPage;

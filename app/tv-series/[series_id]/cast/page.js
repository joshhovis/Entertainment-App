import { fetchSeriesIdData } from "@/utils/fetchData";
import Header from "@/components/Header";

const CastPage = async ({ params }) => {
    const { series_id } = params;

    const series = await fetchSeriesIdData(series_id);

    return (
        <>
            <Header />
            <h1>Cast</h1>
            <h2>{series.title || series.name}</h2>
        </>
    );
};

export default CastPage;

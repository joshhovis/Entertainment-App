import { fetchMovieData } from "@/utils/fetchData";
import styles from "./Cast.module.css";
import Header from "@/components/Header";

const CastPage = async ({ params }) => {
    const { movie_id } = params;

    const movie = await fetchMovieData(movie_id);

    return (
        <>
            <Header />
            <h1>Cast</h1>
            <h2>{movie.title}</h2>
        </>
    );
};

export default CastPage;

const API_KEY = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

//
const fetchTrendingData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
        options
    );
    const data = await response.json();
    return data.results;
};

//
const fetchMoviesData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US`,
        options
    );
    const data = await response.json();
    return data.results;
};

//
const fetchTVData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?language=en-US`,
        options
    );
    const data = await response.json();
    return data.results;
};

export { fetchTrendingData, fetchMoviesData, fetchTVData };

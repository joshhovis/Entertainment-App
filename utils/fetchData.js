const API_KEY = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const fetchData = async (url, page = 1) => {
    try {
        const response = await fetch(`${url}&page=${page}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
};

// Home Page \\
const fetchTrendingData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&with_origin_country=US`,
        page
    );
};

// Movies Page \\
const fetchMoviesData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_origin_country=US`,
        page
    );
};

// TV Series Page \\
const fetchTVData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/tv?language=en-US&with_origin_country=US`,
        page
    );
};

// Movie by ID \\
const fetchMovieData = async (movie_id) => {
    const response = await fetchData(
        `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=release_dates,credits`
    );
    return response;
};

// TV by ID \\
const fetchSeriesIdData = async (series_id) => {
    return await fetchData(
        `https://api.themoviedb.org/3/tv/${series_id}?append_to_response=content_ratings,credits`
    );
};

export {
    fetchTrendingData,
    fetchMoviesData,
    fetchTVData,
    fetchMovieData,
    fetchSeriesIdData,
};

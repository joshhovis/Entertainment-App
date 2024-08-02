const API_KEY = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

const fetchTrendingData = async () => {
    return await fetchData(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`
    );
};

const fetchMoviesData = async () => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/movie?language=en-US`
    );
};

const fetchTVData = async () => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/tv?language=en-US`
    );
};

export { fetchTrendingData, fetchMoviesData, fetchTVData };

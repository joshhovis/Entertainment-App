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
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

const fetchTrendingData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
        page
    );
};

const fetchMoviesData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/movie?language=en-US`,
        page
    );
};

const fetchTVData = async (page) => {
    return await fetchData(
        `https://api.themoviedb.org/3/discover/tv?language=en-US`,
        page
    );
};

export { fetchTrendingData, fetchMoviesData, fetchTVData };

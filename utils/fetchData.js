const API_KEY = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

// Fetch trending data
const fetchTrendingData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
            options
        );
        const data = await response.json();
        console.log("Trending data fetched:", data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching trending data:", error);
        return [];
    }
};

// Fetch movies data
const fetchMoviesData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en-US`,
            options
        );
        const data = await response.json();
        console.log("Movies data fetched:", data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching movies data:", error);
        return [];
    }
};

// Fetch TV shows data
const fetchTVData = async () => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?language=en-US`,
            options
        );
        const data = await response.json();
        console.log("TV data fetched:", data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching TV data:", error);
        return [];
    }
};

export { fetchTrendingData, fetchMoviesData, fetchTVData };

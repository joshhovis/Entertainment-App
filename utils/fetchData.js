import axios from "axios";

const API_KEY = "4fd920ddd94d4b957054179b45a4aa44";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmQ5MjBkZGQ5NGQ0Yjk1NzA1NDE3OWI0NWE0YWE0NCIsIm5iZiI6MTcyMjU0OTQzNC41MjQyODYsInN1YiI6IjY2YWMwMzNiNDc5NzEwZThjMGQyY2E4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QJd4ZwEGxPuu91VFp0Ct3sMV3UFRDbM-Y8yQdCEXXT0`,
    },
};

export const fetchData = async (endpoint) => {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get(url, options);
    return response.data.results;
};

export const fetchTrendingData = async () => {
    return fetchData("/trending/all/day");
};

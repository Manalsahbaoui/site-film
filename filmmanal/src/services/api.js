import axios from 'axios';

const API_KEY = 'e56eff02';
const BASE_URL = 'http://www.omdbapi.com/';

// Recherche de films populaires (OMDb ne fournit pas de vrai "populaires" → on simule avec des titres courants)
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: 'Avengers', // Exemple de recherche par mot-clé populaire
        type: 'movie',
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Erreur lors de la recherche des films populaires :", error);
    return [];
  }
};

// Films tendances → OMDb ne fournit pas cela non plus, donc on simule aussi
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: 'Batman', // Exemple de recherche pour simuler les tendances
        type: 'movie',
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Erreur lors de la recherche des films tendances :", error);
    return [];
  }
};

// Détails d'un film par ID IMDB
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
    return null;
  }
};

// Recherche de films par titre
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'movie',
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Erreur lors de la recherche de films :", error);
    return [];
  }
};

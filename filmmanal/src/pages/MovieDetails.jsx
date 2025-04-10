import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Chargement...</h1>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Film non trouvé</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'}
            alt={`Affiche de ${movie.title}`}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <div className="flex items-center mb-4">
            <span className="bg-amber-500 text-white px-2 py-1 rounded mr-2">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {movie.runtime} minutes
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Synopsis
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {movie.overview || 'Aucun synopsis disponible.'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Date de sortie</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(movie.release_date).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Genre(s)</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {movie.genres?.map(g => g.name).join(', ') || 'Non spécifié'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
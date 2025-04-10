import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await fetchMovieDetails(id);
        if (movieData.Response === 'False') {
          setError(movieData.Error || 'Movie not found');
          setMovie(null);
        } else {
          setMovie(movieData);
        }
      } catch (error) {
        console.error("Error loading movie details:", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Loading...</h1>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {error || "Movie not found"}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.Poster && movie.Poster !== 'N/A' 
              ? movie.Poster
              : 'https://via.placeholder.com/500x750?text=No+Poster'}
            alt={`Poster for ${movie.Title}`}
            className="rounded-lg shadow-lg w-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {movie.Title} ({movie.Year})
          </h1>
          
          {movie.Rated && (
            <div className="flex items-center mb-4">
              <span className="bg-amber-500 text-white px-2 py-1 rounded mr-2">
                {movie.imdbRating}/10
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {movie.Rated} | {movie.Runtime}
              </span>
            </div>
          )}
          
          <div className="mb-4">
            {movie.Genre && (
              <p className="text-gray-600 dark:text-gray-400">
                {movie.Genre}
              </p>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Plot
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {movie.Plot || 'No plot available.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {movie.Released && movie.Released !== 'N/A' && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Released</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.Released}
                </p>
              </div>
            )}
            
            {movie.Director && movie.Director !== 'N/A' && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Director</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.Director}
                </p>
              </div>
            )}
            
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Writer</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.Writer}
                </p>
              </div>
            )}
            
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Actors</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.Actors}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
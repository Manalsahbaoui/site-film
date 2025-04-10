import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies } from '../services/api';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error loading trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const toggleFavorite = (movie) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === movie.id)
        ? prev.filter(fav => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tendances du moment</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isFavorite={favorites.some(fav => fav.id === movie.id)}
            onToggleFavorite={() => toggleFavorite(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default Trending;

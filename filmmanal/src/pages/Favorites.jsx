import React from 'react';
import MovieCard from '../components/MovieCard';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Aucun film favori pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

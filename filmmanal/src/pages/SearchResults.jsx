import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      if (query) {
        try {
          const results = await searchMovies(query);
          setMovies(results);
        } catch (error) {
          console.error("Erreur lors de la recherche :", error);
        } finally {
          setLoading(false);
        }
      }
    };

    search();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Recherche en cours...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Résultats pour : "{query}"
      </h1>
      {movies.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Aucun résultat trouvé.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

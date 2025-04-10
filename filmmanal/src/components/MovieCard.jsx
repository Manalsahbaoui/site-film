import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Star, Calendar, Heart } from 'lucide-react';

const DEFAULT_POSTER = 'https://via.placeholder.com/500x750?text=No+Poster';

const MovieCard = ({ movie, isFavorite = false, onToggleFavorite = () => {} }) => {
  const {
    imdbID,
    Title,
    Poster,
    Year,
    imdbRating,
  } = movie;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 group">
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(movie);
        }}
        className="absolute top-2 left-2 z-10 p-2 bg-black/50 rounded-full hover:bg-rose-500 transition-colors"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart size={20} fill={isFavorite ? "#f43f5e" : "transparent"} className="text-white" />
      </button>

      <Link to={`/movie/${imdbID}`} className="block">
        <div className="aspect-[2/3] relative">
          <img
            src={Poster && Poster !== 'N/A' ? Poster : DEFAULT_POSTER}
            alt={`Affiche du film ${Title}`}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            loading="lazy"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg truncate text-gray-900 dark:text-white">
            {Title}
          </h3>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-amber-500">
              <Star size={16} className="mr-1 fill-current" />
              {imdbRating ? imdbRating : 'N/A'}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar size={16} className="mr-1" />
              {Year || 'N/A'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Year: PropTypes.string,
    imdbRating: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

export default MovieCard;

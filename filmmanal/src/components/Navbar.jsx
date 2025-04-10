import React, { useState, useContext } from "react";
import { Home, Heart, TrendingUp, Film, Search } from "lucide-react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-gray-900 shadow-lg h-20 p-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/" className="flex items-center space-x-2 group">
          <Film size={32} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
          <span className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
            MovieMnl
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Rechercher un film..."
              className="w-full py-2 px-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-amber-400">
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex space-x-4 md:space-x-6">
          <NavLink to="/" icon={<Home size={24} />} label="Accueil" active={location.pathname === '/'} />
          <NavLink to="/trending" icon={<TrendingUp size={24} />} label="Trending" active={location.pathname === '/trending'} />
          <NavLink to="/favorites" icon={<Heart size={24} />} label="Favoris" active={location.pathname === '/favorites'} />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} className="group">
    <button className={`flex flex-col md:flex-row items-center p-2 transition-colors ${
      active ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'
    }`}>
      <span className="mb-1 md:mb-0 md:mr-2 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { fill: active ? "#f59e0b" : "none" })}
      </span>
      <span className="text-sm md:text-base">{label}</span>
    </button>
  </Link>
);

export default Navbar;
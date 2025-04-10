import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
  return (
    // <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <main className="pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    
  );
}

export default App;
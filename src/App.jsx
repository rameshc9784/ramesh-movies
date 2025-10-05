import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import MovieDetails from './pages/MovieDetails'
import Favorites from './components/Favorites'

import logo from "./..//public/logo.png";


export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="size-12 object-contain" />
            <span className="font-extrabold text-2xl text-slate-900 hover:text-sky-600 transition-colors">
              Ramesh Movies
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6 items-center">
            <Link
              to="/"
              className="text-slate-600 font-medium hover:text-sky-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-slate-600 font-medium hover:text-sky-600 transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      </header>


      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}
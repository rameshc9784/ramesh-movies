import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        >
            {/* Poster Image */}
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2">{movie.Title}</h3>
                <div className="text-sm text-gray-300 mt-1 flex justify-between items-center">
                    <span>{movie.Year}</span>
                    <span className="capitalize px-2 py-1 bg-yellow-500/30 text-yellow-300 rounded-md text-xs">
                        {movie.Type}
                    </span>
                </div>
            </div>

            {/* Rating Badge */}
            {movie.imdbRating && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm">
                    ⭐ {movie.imdbRating}
                </div>
            )}
        </div>
    );
}

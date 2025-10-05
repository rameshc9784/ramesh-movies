import React from "react";
import MovieCard from "./MovieCard";
import useFavorites from "../hooks/useFavorites";

export default function Favorites() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-600">
                <h1 className="text-2xl font-bold mb-2">My Favorites</h1>
                <p>No favorites yet. Add some from movie pages.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function Favorites() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
            setItems(stored);
        } catch {
            setItems([]);
        }
    }, []);

    if (items.length === 0) {
        return <div>No favorites yet. Add some from movie pages.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
}

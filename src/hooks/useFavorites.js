import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites") || "[]");
        } catch {
            return [];
        }
    });

    // Save to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            if (!prev.some((m) => m.imdbID === movie.imdbID)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFavorite = (movieId) => {
        setFavorites((prev) => prev.filter((m) => m.imdbID !== movieId));
    };

    const toggleFavorite = (movie) => {
        if (favorites.some((m) => m.imdbID === movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return { favorites, addFavorite, removeFavorite, toggleFavorite };
}

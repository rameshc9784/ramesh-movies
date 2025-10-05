import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../api/omdbService';

function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favorites') || '[]');
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggle = (movie) => {
        setFavorites(prev => {
            const exists = prev.some(m => m.imdbID === movie.imdbID);
            return exists ? prev.filter(m => m.imdbID !== movie.imdbID) : [...prev, movie];
        });
    };

    return { favorites, toggle };
}

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, toggle } = useFavorites();

    useEffect(() => {
        async function loadMovie() {
            try {
                setLoading(true);
                const res = await getMovieById(id);
                if (res.error) throw new Error(res.error);
                setMovie(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadMovie();
    }, [id]);

    function formatRuntime(runtimeStr) {
        // runtimeStr is like "124 min"
        const minutes = parseInt(runtimeStr); // get number
        if (isNaN(minutes)) return runtimeStr; // fallback if not a number

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins}m`;
    }

    if (loading) return <div className="text-center py-20 text-slate-500">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!movie) return <div className="text-center py-20 text-slate-400">No movie data found.</div>;

    const isFav = favorites.some(f => f.imdbID === movie.imdbID);

    return (
        <div className="relative bg-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Blurred Background Poster */}
            <div
                className="absolute inset-0 opacity-20 blur-3xl"
                style={{
                    backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Main Content */}
            <div className="relative flex flex-col md:flex-row p-6 md:p-10 gap-8 bg-slate-900/70 backdrop-blur-sm">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}
                        alt={movie.Title}
                        className="w-64 md:w-72 rounded-2xl shadow-lg border border-slate-700"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between w-full">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                            {movie.Title} <span className="text-slate-400 text-xl">({movie.Year})</span>
                        </h1>

                        <div className="text-sm text-slate-400 mb-4">
                            {movie.Genre} • {formatRuntime(movie.Runtime)} • Rated {movie.Rated}
                        </div>

                        <p className="text-slate-200 text-base leading-relaxed mb-6">{movie.Plot}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                                <span className="text-slate-400 block">Director</span>
                                <span className="font-semibold">{movie.Director}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Writer</span>
                                <span className="font-semibold">{movie.Writer}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Actors</span>
                                <span className="font-semibold">{movie.Actors}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Language</span>
                                <span className="font-semibold">{movie.Language}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Country</span>
                                <span className="font-semibold">{movie.Country}</span>
                            </div>
                            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                                <div>
                                    <span className="text-slate-400 block">Box Office</span>
                                    <span className="font-semibold text-green-400">{movie.BoxOffice}</span>
                                </div>
                            )}
                            {movie.Awards && movie.Awards !== "N/A" && (
                                <div className="col-span-full">
                                    <span className="text-slate-400 block">Awards</span>
                                    <span className="font-semibold text-yellow-400">{movie.Awards}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button
                            onClick={() => toggle(movie)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isFav ? "bg-red-600 hover:bg-red-700 text-white" : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                                }`}
                        >
                            {isFav ? "Remove from Favorites" : "Add to Favorites"}
                        </button>

                        <a
                            href={`https://www.imdb.com/title/${movie.imdbID}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition-all duration-300"
                        >
                            View on IMDb
                        </a>
                    </div>
                </div>
            </div>

            {/* Ratings */}
            {movie.Ratings?.length > 0 && (
                <div className="bg-slate-800/60 px-6 py-4 border-t border-slate-700 flex flex-wrap gap-6 justify-center">
                    {movie.Ratings.map(r => (
                        <div
                            key={r.Source}
                            className="bg-slate-700/60 px-5 py-3 rounded-lg text-sm text-center shadow-sm border border-slate-600"
                        >
                            <div className="font-semibold text-white">{r.Source}</div>
                            <div className="text-yellow-400 text-base">{r.Value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* IMDb Footer */}
            <div className="flex justify-center gap-10 bg-slate-900/70 py-4 border-t border-slate-800 text-sm text-slate-400">
                <div>⭐ IMDb: <span className="text-yellow-400">{movie.imdbRating}</span></div>
                <div>🗳 Votes: {movie.imdbVotes}</div>
                {movie.Metascore && <div>🧭 Metascore: {movie.Metascore}</div>}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/omdbService';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const TYPES = ['', 'movie', 'series', 'episode'];

export default function SearchPage() {
    const [query, setQuery] = useState('Avenger');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch whenever page or type changes
    useEffect(() => {
        if (query) fetchResults();
        else fetchLatestMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, type]);

    // Fetch search results
    async function fetchResults() {
        setLoading(true);
        setError(null);
        const res = await searchMovies({ q: query, page, type });
        setLoading(false);

        if (res.error) {
            setResults([]);
            setTotalResults(0);
            setError(res.error);
        } else {
            const sorted = (res.data.Search || []).sort(
                (a, b) => parseInt(b.Year) - parseInt(a.Year)
            );
            setResults(sorted);
            setTotalResults(Number(res.data.totalResults || 0));
        }
    }

    // Fetch default latest movies if query is empty
    async function fetchLatestMovies() {
        setLoading(true);
        setError(null);
        const res = await searchMovies({ q: 'a', page: 1 });
        setLoading(false);

        if (!res.error && res.data?.Search) {
            const sorted = res.data.Search.sort(
                (a, b) => parseInt(b.Year) - parseInt(a.Year)
            );
            setResults(sorted);
            setTotalResults(Number(res.data.totalResults || 0));
        } else {
            setResults([]);
            setTotalResults(0);
        }
    }

    function onSearchSubmit(e) {
        e.preventDefault();
        setPage(1);
        fetchResults();
    }

    return (
        <div className="p-6">
            {/* Search Bar */}
            <form
                onSubmit={onSearchSubmit}
                className="flex flex-col sm:flex-row gap-4 mb-6 items-center"
            >
                {/* Search Input */}
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, e.g. Inception"
                    className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />

                {/* Type Filter */}
                <select
                    value={type}
                    onChange={(e) => { setType(e.target.value); setPage(1); }}
                    className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none  transition"
                >
                    <option value="">All types</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>

                {/* Search Button */}
                <button
                    type="submit"
                    className="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-500 transition shadow-md"
                >
                    Search
                </button>
            </form>


            {/* Loading / Error / No Results */}
            {loading && (
                <div className="text-center py-10 text-slate-400">Loading...</div>
            )}
            {error && (
                <div className="text-center py-10 text-red-600">{error}</div>
            )}
            {!loading && !error && results.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                    No results found. Try another search.
                </div>
            )}

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            {/* Pagination */}
            {totalResults > 0 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        current={page}
                        total={totalResults}
                        perPage={10}
                        onChange={(p) => setPage(p)}
                    />
                </div>
            )}
        </div>
    );
}

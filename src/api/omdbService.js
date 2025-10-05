const BASE = 'https://www.omdbapi.com/'
const KEY = import.meta.env.VITE_OMDB_API_KEY || ''


if (!KEY) console.warn('VITE_OMDB_API_KEY is not set. Create .env with your OMDB key.')


export async function searchMovies({ q, page = 1, type = '' }) {
    // type should be one of: '', 'movie', 'series', 'episode'
    const params = new URLSearchParams({
        apikey: KEY,
        s: q,
        page: String(page),
    })
    if (type) params.append('type', type)


    const url = `${BASE}?${params.toString()}`


    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Network response not ok')
        const data = await res.json()
        // OMDB uses { Response: 'False', Error: 'Movie not found!' }
        if (data.Response === 'False') return { error: data.Error }
        return { data }
    } catch (err) {
        return { error: err.message }
    }
}


export async function getMovieById(id) {
    const params = new URLSearchParams({ apikey: KEY, i: id, plot: 'full' })
    try {
        const res = await fetch(`${BASE}?${params.toString()}`)
        if (!res.ok) throw new Error('Network response not ok')
        const data = await res.json()
        if (data.Response === 'False') return { error: data.Error }
        return { data }
    } catch (err) {
        return { error: err.message }
    }
}
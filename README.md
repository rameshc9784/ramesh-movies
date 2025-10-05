# Ramesh Movies App

A modern **ReactJS movie search application** that allows users to search for movies, view detailed information, and manage their favorite movies. The app integrates with the **OMDb API** to fetch movie data.

---

## Features

- Search movies by title or keyword.
- Filter results by type: Movie, Series, Episode.
- Paginated results for large datasets.
- View detailed movie information: poster, title, year, genre, runtime, ratings, cast, plot, and IMDB link.
- Add or remove movies from favorites (persisted in **localStorage**).
- Responsive, modern, and cinematic UI using **Tailwind CSS**.
- Default display of latest movies when no search query is provided.
- Clean error handling and user-friendly messages.

---

## Tech Stack

- **Frontend:** ReactJS, React Router, Tailwind CSS
- **API:** OMDb API ([https://www.omdbapi.com/](https://www.omdbapi.com/))
- **State Management:** React Hooks
- **Storage:** LocalStorage for favorites

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/movies-search-app.git
cd movies-search-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root and add your OMDb API key:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

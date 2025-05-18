# 🎬 Movie App

This is a responsive and dynamic **Movie App** built with **React**, **Tailwind CSS**, and **Material Tailwind**. It fetches real-time movie data using the [TheMovieDB API](https://www.themoviedb.org/documentation/api), allowing users to browse movies, view detailed information, and enjoy a smooth, clean UI.

## 🚀 Live Demo

🔗 [View the Live Site](https://movie-app-mohamed-elrokapy.vercel.app)

## 📌 Features

- 🔍 Search for movies
- 📝 View movie details (title, poster, overview, rating, release date, etc.)
- 🎞️ Browse trending/popular movies
- 💡 Responsive design (Mobile, Tablet, Desktop)
- 🎥 Movie details fetched in real-time from TheMovieDB API
- 🧑 Built with reusable and clean components

## 🛠️ Tech Stack

- ⚛️ **React JS**
- 🎨 **Tailwind CSS**
- 🧱 **Material Tailwind**
- 🔄 **Axios** (for API requests)
- 🧭 **React Router DOM**
- 🧠 **redux-redux toolkit** 
- 🌐 **TheMovieDB API**

## 📁 Folder Structure

movieApp/
├── public/
├── src/
│ ├── components/ # Reusable components (MovieCard, SearchBar, etc.)
│ ├── pages/ # Pages like Home, MovieDetails
│ ├── api/ # API integration logic
│ ├── context/ # Language or theme context (if any)
│ ├── styles/ # Custom styling
│ └── main.jsx
├── tailwind.config.js
├── package.json
└── README.md


## ▶️ Getting Started Locally

To run this project on your local machine:

```bash
git clone https://github.com/mohamed-elrokapy/movieApp.git
cd movieApp
npm install
npm run dev

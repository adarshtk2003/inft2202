// Adarsh Thekkekulathingal Kuriyachan
// 03-28-2025
// Web Development CSS
// Test 3
// app.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movies from './data/movies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3022;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

const router = express.Router();

router.get('/api/movies', (req, res) => {
    let filteredMovies = [...movies];
    const { rating, genre } = req.query;

    if (rating !== undefined) {
        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
            return res.status(400).json({
                error: 'Rating must be a number between 1 and 10'
            });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating >= ratingNum);
    }

    if (genre) {
        const genreLower = genre.toLowerCase();
        filteredMovies = filteredMovies.filter(movie => 
            movie.genre.toLowerCase() === genreLower
        );
    }

    filteredMovies.sort((a, b) => b.rating - a.rating);
    res.json(filteredMovies);
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
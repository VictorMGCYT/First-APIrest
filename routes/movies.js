import { Router } from "express";
import movies from '../movies.json' with {type: 'json'}
import crypto from 'crypto'
import {validarSchem, validateParcialMovie} from '../schems/movie.js'

export const routerMovies = Router();

routerMovies.get('/', (req, res) => {

    const {genre} = req.query;

    if (genre) {
        
        const filterGenre = movies.filter(
            movie => movie.genre.includes(genre)
        )
        if (Object.keys(filterGenre).length > 0) {
            return res.json(filterGenre)
        }
        else{
            return res.json({error: 404, mensaje: "Not found"})
        }

    }
    res.json(movies)
})

routerMovies.get('/:id', (req, res) => {
    const {id} = req.params;
    
    const movie = movies.find(movie => movie.id === id);

    if (movie) {
        res.json(movie)
    } 
    else{
        res.status(404).json({ error: 'Película no encontrada' });
    }
    
})


routerMovies.post('/', (req, res) => {
    const resul = validarSchem(req.body)

    if (resul.error) {
        return res.status(400).json({ error: JSON.parse(resul.error.message)})
    }

    // Esto sería lo que se mandaría a BD
    const newMovie = {
        id: crypto.randomUUID(),
        ...resul.data
    }

    // Esto ya no se consideraría REST API ya que estamos mutando el objeto
    // Pero por ahora es para fines practicos
    movies.push(newMovie);

    res.status(201).json(newMovie)
})

routerMovies.patch('/:id', (req, res) => {
    const {id} = req.params;
    const resul = validateParcialMovie(req.body)


    if (!resul.success) {
        return res.status(400).json({error: JSON.parse(resul.error.message)})
    }

    // Filtrar la película por su id
    const movieIndex = movies.findIndex( movie => movie.id === id)

    console.log(movieIndex)

    if (movieIndex === -1) {
        return res.status(404).json({mensaje: "Película no encontrada"})
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...resul.data //Aquí va la información recuperada del resulado que envió el usuario por actualizar
    }
    

    movies[movieIndex] = updatedMovie;

    res.json(updatedMovie);
})

routerMovies.delete('/:id', (req, res) => {
    const {id} = req.params;

    const movieIndex = movies.findIndex( movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({mensaje: "Película no encontrada"})
    }

    movies.splice(movieIndex, 1);

    res.json({mensaje: "Película eliminada"})
})


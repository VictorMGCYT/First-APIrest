import { MovieModel } from "../models/local-file-system/movie.js";
import {validarSchem, validateParcialMovie} from '../schems/movie.js'

class MoviesController {

    // Control para obtener todas las peliculas
    static async getAll(req, res) {

        const {genre} = req.query;
    
        // El modelo que se encarga de recuperar y filtrar las peliculas
        const movies = await MovieModel.getAllMovies({genre: genre})
        
        res.json(movies)
    }

    // Control para una pelicula en particular
    static async getById(req, res) {
        const {id} = req.params;
        
        const movie = await MovieModel.getMovieById({id: id})
    
        if (movie) {
            res.json(movie)
        } 
        else{
            res.status(404).json({ error: 'Película no encontrada' });
        }
        
    }

    // Control para crear una pelicula
    static async createMovie(req, res) {
        const resul = validarSchem(req.body)
    
        if (resul.error) {
            return res.status(400).json({ error: JSON.parse(resul.error.message)})
        }
    
        const newMovie = await MovieModel.createMovie({input: resul.data})
    
        res.status(201).json(newMovie)
    }

    // Control para actualizar una pelicula
    static async updateMovie(req, res) {
        const {id} = req.params;
        const resul = validateParcialMovie(req.body)
    
    
        if (!resul.success) {
            return res.status(400).json({error: JSON.parse(resul.error.message)})
        }
    
        const updatedMovie = await MovieModel.updateMovie({id: id, input: resul.data})
    
        res.json(updatedMovie);
    }

    // Control para eliminar una pelicula
    static async deleteMovie (req, res) {
        const {id} = req.params;
    
        const result = await MovieModel.deleteMovie({id: id})
    
        if (result === false) {
            return res.status(404).json({mensaje: "Película no encontrada"})
        }
    
        res.json({mensaje: "Película eliminada"})
    }
}

export {MoviesController};
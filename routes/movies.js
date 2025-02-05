import { Router } from "express";
import { MoviesController } from "../controllers/movies.js";

export const routerMovies = Router();

routerMovies.get('/', MoviesController.getAll)

routerMovies.get('/:id', MoviesController.getById)


routerMovies.post('/',MoviesController.createMovie)

routerMovies.patch('/:id', MoviesController.updateMovie)

routerMovies.delete('/:id', MoviesController.deleteMovie)


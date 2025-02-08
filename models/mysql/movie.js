import { connection } from './bd.js'
import crypto from 'crypto'

class MovieModel {

    static async getAllMovies ({genre}){

        if(genre){
            const genreToLowerCase = genre.toLowerCase();
            const [movies, tableInfo] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?',
                [genreToLowerCase]
            )

            if(movies.length === 0){
                return [];
            }


        }

        const [movies, tableInfo] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;`
        )

        return movies;
    }

    static async getMovieById({id}){
        
        const [movie, tableInfo] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if(movie.length === 0) return null;

        return movie;

    }

    static async createMovie({input}){

        const {genre: genreInput ,title, year, director, duration, poster, rate} = input;

        const uuid = crypto.randomUUID();

        const insertion = await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
            VALUE (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, title, year, director, duration, poster, rate]
        )

        const [newMovie, infoTable] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie 
            WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return newMovie; 

    }

    static async deleteMovie({id}){

        const [movie, tableInfo] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if(movie.length === 0) return false;

        await connection.query(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        return true;

    }


    static async updateMovie({id, input}){

    }

}

export {MovieModel}
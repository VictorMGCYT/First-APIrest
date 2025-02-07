import movies from '../../movies.json' with {type: 'json'}
import crypto from 'crypto'

class MovieModel {

    static async getAllMovies ({genre}){
        if (genre) {
            return movies.filter(
                movie => movie.genre.includes(genre)
            )
        }

        return movies
    }

    static async getMovieById({id}){
        return movies.find(movie => movie.id === id)
    }

    static async createMovie({input}){
        const newMovie = {
            id: crypto.randomUUID(),
            ...input
        }

        movies.push(newMovie)

        return newMovie
    }

    static async deleteMovie({id}){
        const index = movies.findIndex(movie => movie.id === id)

        if (index === -1) {
            return false
        }

        movies.splice(index, 1)

        return true
    }


    static async updateMovie({id, input}){
        const index = movies.findIndex(movie => movie.id === id)

        if (index === -1) {
            return false
        }

        movies[index] = {
            ...movies[index],
            ...input
        }

        return movies[index]
    }

}

export {MovieModel}
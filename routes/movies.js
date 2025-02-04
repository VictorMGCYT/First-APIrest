import { Router } from "express";
import movies from '../movies.json' with {type: 'json'}

const router = Router();

router.get('/', (req, res) => {

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
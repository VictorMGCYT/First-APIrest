import express from 'express'
import fs from 'fs';
import crypto from 'crypto'
import { validarSchem, validateParcialMovie } from './schems/movie.js';
import { error } from 'console';

const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));


const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT ?? 1234

const ACCEPED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']

// Express middleware para que puedan funcionar las solicitudes POST que contengan un JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.json({mensaje: 'Página principal'})
})

app.get('/movies', (req, res) => {

    const origin = req.header('origin');
    if (ACCEPED_ORIGINS.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
    }

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


// Obtener parametros de una URL
app.get('/movies/:id', (req, res) => {
    // Hacemos destructurin a req.params para obtener los parametros de la URL
    const {id} = req.params;
    
    const movie = movies.find(movie => movie.id === id);

    if (movie) {
        res.json(movie)
    } 
    else{
        res.status(404).json({ error: 'Película no encontrada' });
    }
    
})

app.post( '/movies', (req, res) => {

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

app.patch( '/movies/:id', (req, res) => {

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

app.options('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.send(200)
})

app.delete('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
    const {id} = req.params;

    const movieIndex = movies.findIndex( movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({mensaje: "Película no encontrada"})
    }

    movies.splice(movieIndex, 1);

    res.json({mensaje: "Película eliminada"})
})


app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`)
})
import express from 'express'
import { routerMovies } from './routes/movies.js';
import { middlewareCors } from './middlewares/cors.js';

const app = express();
app.disable('x-powered-by');
const PORT =  1234

app.use(middlewareCors());
// Express middleware para que puedan funcionar las solicitudes POST que contengan un JSON
app.use(express.json());




app.get('/', (req, res) => {
    res.json({mensaje: 'Página principal'})
})

app.use('/movies', routerMovies);


app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`)
})
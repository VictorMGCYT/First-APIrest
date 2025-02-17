
import cors from 'cors';


const middlewareCors = () => cors({
    origin: (origin, callback) => {
        const ACCEPED_ORIGINS = ['http://localhost:8080', 'http://localhost:8081']

        if(ACCEPED_ORIGINS.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('No permitido por CORS'))
    }
})

// Exportamos el middleware de CORS
export { middlewareCors }
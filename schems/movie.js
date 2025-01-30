import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie tittle must be a String',
        required_error: 'Movie tittle is required'
    }),
    year: z.number().int().min(1900).max(2027),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10),
    poster: z.string().url({
        message: "Poster must be a valir URL"
    }),
    genre: z.array(
        z.enum(["Action", "Adventure", "Sci-Fi", "Drama", "Romance", "Crime", "Biography", "Fantasy"])
    )
})

function validarSchem(objeto) {
    return movieSchema.safeParse(objeto)
}

function validateParcialMovie(object) {
    return movieSchema.partial().safeParse(object)
}

export {
    validarSchem,
    validateParcialMovie
}
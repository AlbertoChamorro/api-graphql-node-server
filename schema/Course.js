module.exports = `
    # Este type indica la información disponibles para cursos
    type Course {
        id: ID!
        title: String!
        description: String!
        # profesor que imparte el curso
        teacher: Teacher
        rating: Float @deprecated(reason: "No creemos en los ratings ya.")
        #comentarios que tendrá el curso
        comments: [Comment]
    }
`
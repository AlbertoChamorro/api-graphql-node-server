const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = `
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
    # Este type indica la información disponibles para profesores
    type Teacher {
        id: ID!
        name: String!
        nacionality: String!
        gender:  Gender 
        courses: [Course]
    }
    # Este type indica la información disponibles para comentarios
    type Comment{
        id: ID!
        name: String!
        content: String!
    }
    # Este type indica el género
    enum Gender{
        MALE
        FEMALE
    }
    # EndPoints disponibles para los clientes que consuman este servicio
    type Query {
        courses: [Course]
        teachers: [Teacher]
        comments: [Comment]
        course(id: Int): Course
        teacher(id: Int): Teacher
    }
`

const resolvers = {
    Query: {
        courses: () => {
            return [
                {
                    id: 1,
                    title: "Curso de GraphQL",
                    description: "Aprende y crea tus servicios para multiples clientes",
                    rating: 2.0
                },
                {
                    id: 2,
                    title: "Curso de ReactJS",
                    description: "Aprende y crea tu frontend con esta potente herramienta",
                    rating: 7.0
                }
            ]
        }
    },
    Course: {
        teacher: () => {
            return {
                name: "Alberto Martin"
            }
        }
    }
}

const schema = makeExecutableSchema({ 
    typeDefs,
    resolvers: resolvers 
})

module.exports = schema
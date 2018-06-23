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
        },
        teachers: () => {
            return [
                {
                    id: 2090,
                    name: "Alberto Martin",
                    nacionality: "Nicaragua",
                    gender:  "MALE" 
                },
                {
                    id: 2091,
                    name: "Melody Alemán",
                    nacionality: "España",
                    gender:  "FEMALE" 
                }
            ]
        }
    },
    Course: {
        teacher: () => {
            return {
                id: 2090,
                name: "Alberto Martin",
                nacionality: "Nicaragua",
                gender:  "MALE"
            }
        },
        comments: () => {
            return [
                {
                    id: 1000,
                    name: "Jose",
                    content: "El curso estuvo tremendo"
                },
                {
                    id: 1001,
                    name: "Karina",
                    content: "wuaaaaaao que tuani...."
                },
                {
                    id: 1002,
                    name: "Henry",
                    content: "Excelente sigan asi. x)"
                }
            ]
        }
    }
}

const schema = makeExecutableSchema({ 
    typeDefs,
    resolvers: resolvers 
})

module.exports = schema
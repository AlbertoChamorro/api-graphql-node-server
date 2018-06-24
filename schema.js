const {makeExecutableSchema, addMockFunctionsToSchema} = require('graphql-tools')
const casual = require('casual')

// models database information
const Course = require('./models/Course')
const Teacher = require('./models/Teacher')
const Comment = require('./models/Comment')

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
        courses: () => Course.query().eager('teacher'),
        teachers: () => Teacher.query(),
        course: (rootValue, args) => Course.query().findById(args.id),
        teacher: (rootValue, args) => Teacher.query().findById(args.id) 
    }
}

const schema = makeExecutableSchema({ 
    typeDefs,
    resolvers: resolvers 
})

module.exports = schema
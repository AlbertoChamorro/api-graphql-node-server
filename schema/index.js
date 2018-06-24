const {makeExecutableSchema, addMockFunctionsToSchema} = require('graphql-tools')
const resolvers = require('../resolvers')

// types schemas
const Teacher = require('./Teacher')
const Course = require('./Course')
const Comment = require('./Comment')

const rootQuery = `    
    # EndPoints disponibles para los clientes que consuman este servicio
    type Query {
        courses: [Course]
        teachers: [Teacher]
        course(id: Int): Course
        teacher(id: Int): Teacher
    }

    type Mutation {
        # (mutation-end point) for create a new teacher
        teacherCreate(teacher: NewTeacher): Teacher

        # (mutation-end point) for update a teacher
        teacherUpdate(id: Int!, teacher: UpdateTeacher): Teacher
    }
`
const schema = makeExecutableSchema({ 
    typeDefs: [rootQuery, Course, Comment, Teacher],
    resolvers 
})

module.exports = schema
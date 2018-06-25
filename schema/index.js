const {makeExecutableSchema, addMockFunctionsToSchema} = require('graphql-tools')
const resolvers = require('../resolvers')

// types schemas
const Teacher = require('./Teacher')
const Course = require('./Course')
const Comment = require('./Comment')

const rootQuery = ` 
    union SearchTypeResult = Course | Teacher

    # EndPoints disponibles para los clientes que consuman este servicio
    type Query {
        courses: [Course]
        teachers: [Teacher]
        course(id: Int): Course
        teacher(id: Int): Teacher
        search(query: String!): [SearchTypeResult]
    }

    type Mutation {
        # (mutation-end point) for create a new teacher
        teacherCreate(teacher: NewTeacher): Teacher

        # (mutation-end point) for update a teacher
        teacherUpdate(id: Int!, teacher: UpdateTeacher): Teacher

        # (mutation-end point) for delete a teacher
        teacherDelete(id: Int!): Teacher

        # (mutation-end point) for create a new course
        courseCreate(course: NewCourse): Course

        # (mutation-end point) for update a course
        courseUpdate(id: Int!, course: UpdateCourse): Course

        # (mutation-end point) for delete a course
        courseDelete(id: Int!): Course
    }
`
const schema = makeExecutableSchema({ 
    typeDefs: [rootQuery, Course, Comment, Teacher],
    resolvers 
})

module.exports = schema
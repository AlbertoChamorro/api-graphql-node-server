const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = `
    # this is course systems
    type Course {
        id: ID!
        title: String!
        description: String!
        # list of teachers an course
        teacher: Teacher
        rating: Float
        comments: [Comment]
    }

    type Teacher {
        id: ID!
        name: String!
        nacionality: String!
        gender:  Gender 
        courses: [Course]
    }

    type Comment{
        id: ID!
        name: String!
        content: String!
    }

    enum Gender{
        MALE
        FEMALE
    }

    type Query {
        courses: [Course]
        teachers: [Teacher]
        comments: [Comment]
        course(id: Int): Course
        teacher(id: Int): Teacher
    }
`
const schema = makeExecutableSchema({ typeDefs })

module.exports = schema
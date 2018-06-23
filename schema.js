const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = `
    type Course {
        id: ID!
        title: String!
    }

    type Query {
        courses: [Course]
    }
`
const schema = makeExecutableSchema({ typeDefs })

module.exports = schema
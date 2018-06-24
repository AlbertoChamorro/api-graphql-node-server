const Course = require('./models/Course')
const Teacher = require('./models/Teacher')
const Comment = require('./models/Comment')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[teacher, comments]'),
        teachers: () => Teacher.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[teacher, comments]').findById(args.id),
        teacher: (rootValue, args) => Teacher.query().eager('courses').findById(args.id) 
    }
}

module.exports = resolvers
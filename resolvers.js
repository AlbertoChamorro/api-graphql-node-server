const Course = require('./models/Course')
const Teacher = require('./models/Teacher')
const Comment = require('./models/Comment')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[teacher, comments]'),
        teachers: () => Teacher.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[teacher, comments]').findById(args.id),
        teacher: (rootValue, args) => Teacher.query().eager('courses').findById(args.id),
        search: (_, args) => {
            // var courses = Course.query().where('title', 'LIKE', '%'+args.query+'%')
            // var teachers = Teacher.query().where('name', 'LIKE', '%morro%');
            //return courses.mergeContext(teachers)
            return Course.query().where('title', 'LIKE', `%${args.query}%`)
                .then((courses)=>{
                    return Teacher.query().where('name', 'LIKE', `%${args.query}%`)
                            .then((teachers) => {
                                return [...courses, ...teachers]
                            })
                })
        }
    },
    SearchTypeResult: {
        __resolveType: (obj) => {
            if(obj.title) return "Course"
            return "Teacher"
        }
    },
    Mutation: {
        teacherCreate: (_, args) => {
            console.log(args)
            return Teacher.query().insert(args.teacher)
        },
        teacherUpdate: (_, args) => {
            console.log(args)
            return Teacher.query().patchAndFetchById(args.id, args.teacher)
        },
        teacherDelete: (_, args) => {
            return Teacher.query().findById(args.id)
                .then((teacher) => {
                    return Teacher.query().deleteById(args.id)
                        .then(() => {
                             return teacher
                         })
                })     
        },
        courseCreate: (_, args) => {
            return Course.query().insert(args.course)
        },
        courseUpdate: (_, args) => {
            return Course.query().patchAndFetchById(args.id, args.course)
        },
        courseDelete: (_, args) => {
            return Course.query().findById(args.id)
                .then((course) => {
                    return Course.query().deleteById(args.id)
                        .then(() => {
                            return course
                        })
                })
        }
    }
}

module.exports = resolvers
const Course = require('./models/Course')
const Teacher = require('./models/Teacher')
const Comment = require('./models/Comment')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[teacher, comments]'),
        teachers: () => Teacher.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[teacher, comments]').findById(args.id),
        teacher: (rootValue, args) => {
            console.log(rootValue)
            console.log(args)
            return Teacher.query().eager('courses').findById(args.id)
        },
        search: (_, args) => {
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
                        if(teacher != null){
                            return Teacher.query().deleteById(args.id)
                                    .then((numberDeleteRows) => {
                                        if(numberDeleteRows > 0) return teacher
                                        return new Error(`No se ha podido eliminar el Profesor con id ${args.id}, intente nuevamente.`)
                                    })
                        }
                        return new Error(`El Profesor con id ${args.id} no se ha podido encontrar.`)
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
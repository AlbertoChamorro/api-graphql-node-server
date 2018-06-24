module.exports = `
    # Este type indica la información disponibles para profesores
    type Teacher {
        id: ID!
        name: String!
        nacionality: String!
        gender:  Gender 
        courses: [Course]
    }

    # Este type indica el género
    enum Gender{
        MALE
        FEMALE
    }
`
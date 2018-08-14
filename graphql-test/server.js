var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    courses: [Course],
    teachers: [Teach],
    course(id: Int): Course
  }

  type Course {
    id: Int,
    name: String,
    description: String,
    teach: Teach
  }

  type Teach {
    id: Int,
    name: String,
    lastname: String,
    nacionality: Country
  }

  type Country {
    id: Int,
    name: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  courses: () =>  {
    return [
      {
        id: 2001,
        name: "BD I",
        description: "Introductorio",
        teach: {
          id: 9900,
          name: "Marth",
          lastname: "Martinez",
          Country: {}
        }
      },
      {
        id: 1990,
        name: "Calculo I",
        description: "Diferencial",
        teach: {}
      },
      {
        id: 2004,
        name: "Inteligencia Artificial",
        description: "Avanzado",
        teach: {}
      }
    ];
  },
  teachers: () =>  {
    return [
      {
          id: 9900,
          name: "Marth",
          lastname: "Martinez",
          Country: {}
        }
    ];
  },
  course: (id) => {
    return {
      id: 1990,
      name: "Calculo I",
      description: "Diferencial",
      teach: {}
    }
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
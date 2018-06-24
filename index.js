const express = require('express')
const bodyParser = require('body-parser')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
// setup managment database
const configDatabase = require('./db/config')
const schema = require('./schema')
const app = express()

app.use(
    '/graphql', 
    bodyParser.json(), 
    graphqlExpress({ schema })
)

app.use(
    '/graphiql', 
    graphiqlExpress({endpointURL: '/graphql'})
)

const PORT = 6160
app.listen(PORT, () => {
    console.log('SERVER RUN...')
})
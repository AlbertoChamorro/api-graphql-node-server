module.exports = { 
    development:{
        dialect: 'sqlite3',
        connection: {
            filename: `${__dirname}/db.sqlite`
        },
        useNullAsDefault: true
    },
    production: {
        
    }
}

// dialect | client
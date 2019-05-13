const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('config')

const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app = express()

// Body Parser Middleware
app.use(express.json());

//DB Config
const db = config.get('mongoURI')

mongoose
    .connect(db , {
         useNewUrlParser: true,
         useCreateIndex: true
         })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


app.use('/api/items', items)
app.use('/api/users',users)
app.use('/api/auth',auth)

const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server started on port ${port}`))
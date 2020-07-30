const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({
    path: './config/config.env'
})

connectDB()

// router setup
const transactions = require('./routes/transactions')

const app = express()

// body parser so we can parse POST requests
app.use(express.json())

// log http requests using morgan
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions)

// make client/build our static folder and load index.html in production
// upon GET request for anything other than api files (handled above)
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
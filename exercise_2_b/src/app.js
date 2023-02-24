
const registerRoutes = require('./routes')
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(morgan('tiny'))

registerRoutes(app)

module.exports =  app
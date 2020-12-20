require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const bookmarksRouter = require('./bookmarks-router')
const errorHandler = require('./error-handler')
const validateBearerToken = require('./validate-bearer-token')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(validateBearerToken)

app.use(bookmarksRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/test', (req, res) => {
  res.send('test')
})

app.use(errorHandler)

module.exports = app
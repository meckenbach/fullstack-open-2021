const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unkownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unkown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decoded = await jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decoded.id)
    request.user = user ? user : null
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  unkownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
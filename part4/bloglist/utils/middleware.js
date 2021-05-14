const logger = require('./logger')

const unkownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unkown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}

module.exports = {
  unkownEndpoint,
  errorHandler
}
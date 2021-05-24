const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pick } = require('lodash/fp')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const isCorrectPassword = user && password
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (isCorrectPassword) {
    const userForToken = pick(['username', 'id'], user)

    const token = await jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .json({ ...pick(['username', 'name'], user), token })

  } else {
    response
      .status(401)
      .json({ error: 'invalid username or password' })
  }
})

module.exports = loginRouter
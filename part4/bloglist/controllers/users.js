const User = require('../models/user')
const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (password === undefined || password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })

  try {
    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch (err) {
    next(err)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})

module.exports = usersRouter
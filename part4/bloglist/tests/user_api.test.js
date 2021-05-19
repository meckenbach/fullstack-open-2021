const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })

  await user.save()
})

describe('creating a user', () => {
  test('succeeds with valid username, password and name', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'foobar',
      name: 'Foo Bar',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('fails with status code "400" if username is not unique', async () => {
    const newUser = {
      username: 'root',
      name: 'Foo Bar',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with status code "400" if no username is given', async () => {
    const newUser = {
      name: 'Foo Bar',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with status code "400" if password is less than 3 characters long', async () => {
    const newUser = {
      username: 'foobar',
      name: 'Foo Bar',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toBe('password must be at least 3 characters long')
  })
})

describe('viewing users', () => {
  test('succeeds with status code "200" returning all users', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(1)
  })

  test('does not return password hashes', async () => {
    const res = await api
      .get('/api/users')

    const users = res.body

    users.forEach(user => expect(user.passwordHash).toBeUndefined())
  })
})

afterAll(() => {
  mongoose.connection.close()
})

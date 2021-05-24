const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('login', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()
  })

  test('succeeds with valid credentials and returns token', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)

    expect(response.body).toMatchObject({ token: expect.anything(), username: 'root', name: 'Superuser' })
  })

  test('fails with "401" if username and/or password are missing or invalid', async () => {
    await api
      .post('/api/login')
      .send({ password: 'secret' })
      .expect(401)
      .expect({ error: 'invalid username or password' })

    await api
      .post('/api/login')
      .send({ username: 'root' })
      .expect(401)
      .expect({ error: 'invalid username or password' })

    await api
      .post('/api/login')
      .send({ username: 'nonexistinguser', password: 'secret' })
      .expect(401)
      .expect({ error: 'invalid username or password' })

    await api
      .post('/api/login')
      .send({ username: 'root', password: 'wrongpassword' })
      .expect(401)
      .expect({ error: 'invalid username or password' })

    await api
      .post('/api/login')
      .send({})
      .expect(401)
      .expect({ error: 'invalid username or password' })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
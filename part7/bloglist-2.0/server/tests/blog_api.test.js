const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the creator`s user information is displayed with blog', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const users = await helper.usersInDb()
    blogs.forEach(blog => {
      expect(users).toContainEqual(expect.objectContaining({ ...blog.user, blogs: expect.anything() }))
    })
  })
})

describe('adding a new blog', () => {
  let token

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()

    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    token = response.body.token
  })

  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const res = await api.get('/api/blogs')
    const authors = res.body.map(blog => blog.author)

    expect(res.body).toHaveLength(helper.initialBlogs.length+1)
    expect(authors).toContain('Superuser')
  })

  test('returns the saved document with populated "user" field', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', `bearer ${token}`)

    const savedBlog = response.body
    expect(savedBlog.user.username).toEqual('root')
  })

  test('defaults to value 0 for missing "likes" property', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Superuser',
      url: 'http://localhost'
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    const savedBlog = res.body

    expect(savedBlog.likes).toBe(0)
  })

  test('fails with status code "401" if token is missing or invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
      .expect({ error: 'invalid token' })

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', 'bearer invalidtoken')
      .expect(401)
      .expect({ error: 'invalid token' })
  })

  test('fails with status code "400 Bad Request" if "title" and/or "url" properties are missing', async () => {
    let newBlog = { author: 'Foo Bar', url: 'http://localhost', likes: 1 }
    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(newBlog)
      .expect(400)

    newBlog = { title: 'Test', author: 'Foo Bar', likes: 1 }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    newBlog = { author: 'Foo Bar', likes: 0 }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

})

describe('viewing a specific blog', () => {
  test('has unique identifier property named "id"', async () => {
    const res = await api.get('/api/blogs')

    for (const blog of res.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('updating a blog', () => {
  let savedBlog, token

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()

    let response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    token = response.body.token

    response = await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(helper.newBlog)

    savedBlog = response.body
  })

  test('succeeds with valid id and token', async () => {
    const response = await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send({ likes: 10 })
      .set({ 'Authorization': `bearer ${token}` })

    const updatedBlog = response.body

    expect(updatedBlog.likes).toBe(10)
  })

  test('fails with status code "401" if no token is sent', async () => {
    await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send({ likes: 10 })
      .expect(401)
  })


})

describe('deleting a blog', () => {
  let savedBlog, token

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()

    let response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    token = response.body.token

    response = await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(helper.newBlog)

    savedBlog = response.body
  })

  test('succeeds with valid "id" and token', async () => {
    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })

  test('fails with status code "401" if token is missing or invalid', async () => {
    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .expect(401)
      .expect({ error: 'invalid token' })

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('Authorization', 'bearer invalidtoken')
      .expect(401)
      .expect({ error: 'invalid token' })
  })

  test('fails with status code "404" if "id" is valid but does not exist', async () => {
    const id = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
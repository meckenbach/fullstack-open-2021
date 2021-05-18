const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Foo Bar',
      url: 'http://localhost',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    const res = await api.get('/api/blogs')
    const authors = res.body.map(blog => blog.author)
    
    expect(res.body).toHaveLength(helper.initialBlogs.length+1)
    expect(authors).toContain('Foo Bar')
  })

  test('without "likes" property, defaults to value 0', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Foo Bar',
      url: 'http://localhost'
    }
  
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
    
    const savedBlog = res.body

    expect(savedBlog.likes).toBe(0)
  })

  test('missing "title" and/or "url" properties returns status code "400 Bad Request"', async () => {
    let newBlog = { author: 'Foo Bar', url: 'http://localhost', likes: 1 }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    newBlog = { title: 'Test', author: 'Foo Bar', likes: 1 }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    newBlog = { author: 'Foo Bar', likes: 0 }
    await api
      .post('/api/blogs')
      .send(newBlog)
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
  test('succeeds with valid "id"', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Joe Test',
      url: 'http://localhost',
      likes: 0
    }
  
    let res = await api
      .post('/api/blogs')
      .send(newBlog)
    
    const savedBlog = res.body
  
    res = await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send({ likes: 10 })
  
    const updatedBlog = res.body
    
    expect(updatedBlog.likes).toBe(10)
  }) 
})

describe('deleting a blog', () => {
  test('succeeds with valid "id"', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Joe Test',
      url: 'http://localhost',
      likes: 0
    }
  
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
    
    const savedBlog = res.body
    
    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .expect(204)
  })
  
  test('fails with status code "404" if "id" is valid but does not exist', async () => {
    const id = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
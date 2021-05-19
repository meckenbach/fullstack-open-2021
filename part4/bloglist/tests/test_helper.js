const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    user: '60a4dcb8b6e291376579cac5',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: '60a4dcb8b6e291376579cac5',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const newBlog = {
  title: 'Test',
  author: 'Superuser',
  url: 'http://localhost',
  likes: 1
}

const initialUsers = [
  {
    _id: '60a4dcb8b6e291376579cac5',
    username: 'mle',
    name: 'Max E.',
    passwordHash: 'dummy',
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8']
  },
  {
    _id: '60a51c0d3f1bba43de0989ab',
    username: 'foobar',
    name: 'Foo Bar',
    passwordHash: 'dummy',
    blogs: []
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willdeletesoon', author: 'foobar', url: 'foobar', likes: 0 })
  await blog.save()
  await blog.remove()
  return blog.id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers
}
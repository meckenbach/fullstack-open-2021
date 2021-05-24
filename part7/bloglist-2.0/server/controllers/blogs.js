const express = require('express')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const savedBlog = await new Blog({ ...request.body, user: request.user._id })
      .save()

    await savedBlog
      .populate('user', { username: 1, name: 1 })
      .execPopulate()

    response
      .status(201)
      .json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response
        .status(404)
        .end()
    }

    if (blog.user.toString() === request.user._id.toString()) {
      await Blog.findByIdAndDelete(blog._id)
      response
        .status(204)
        .end()
    } else {
      response
        .status(401)
        .json({ error: 'invalid token' })
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, request.body, { new: true })
      .populate('user', { username: 1, name: 1 })
    if (updatedBlog) {
      response
        .status(200)
        .json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
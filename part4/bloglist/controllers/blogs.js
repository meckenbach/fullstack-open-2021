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

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (updatedBlog) {
      res.status(200)
      res.json(updatedBlog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
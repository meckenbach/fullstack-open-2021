const express = require('express')
const Blog = require('../models/blog')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blog = await Blog.find({})
  return res.json(blog)
})

blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  try {
    const savedBlog = await blog.save()
    res.status(201)
    res.json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id)
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).end()
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
const { groupBy, countBy, maxBy, sumBy, flow, defaultTo } = require('lodash/fp')
const map = require('lodash/fp/map').convert({ 'cap': false })

const dummy = () => {
  return 1
}

const totalLikes = flow(
  sumBy('likes'),
  defaultTo([])
)

const favoriteBlog = flow(
  maxBy('likes'),
  defaultTo([])
)

const mostBlogs = flow(
  countBy('author'),
  map((blogsCount, author) => ({ author, blogs: blogsCount })),
  maxBy('blogs'),
  defaultTo([])
) 

const mostLikes = flow(
  groupBy('author'),
  map((blogs, author) => ({ author, likes: totalLikes(blogs) })),
  maxBy('likes'),
  defaultTo([])
)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
const mongoose = require('mongoose')
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const config = require('./util/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database.')
  })
  .then(error => {
    console.log('error connecting to database', error)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
`

const resolvers = {
  Book: {
    author: async (root) => {
      try {
        return await Author.findById(root.author)
      } catch (error) {
        console.log('error resolving author', error.message)
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      try {
        return await Book
          .find({ author: root.id })
          .countDocuments()
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  Query: {
    bookCount: async () => {
      const count = await Book.countDocuments({})
      return count
    },
    authorCount: async () => {
      const count = await Author.countDocuments({})
      return count
    },
    allBooks: async (root, { author, genre = null }) => {
      if (!genre) {
        return await Book.find({})
      }
      return await Book.find({ genres: { $in: [genre] } })
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (_, __, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const { title, author: name, published, genres } = args
      try {
        let author = await Author.findOne({ name })
        if (!author) {
          author = new Author({ name })
          await author.save()
        }
        const book = new Book({
          title,
          author,
          published,
          genres
        })
        await book.save()
        return book
      } catch (error) {
        switch (error.name) {
          case 'ValidationError':
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          default:
            console.log(error.message)
        }
      }
    },
    editAuthor: async (root, { name, setBornTo: born }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        return await Author.findOneAndUpdate({ name }, { born }, { new: true })
      } catch (error) {
        console.log(error.message)
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User(args)
        return await user.save()
      } catch (error) {
        switch (error.name) {
          case 'ValidationError':
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          default:
            console.log(error.message)
        }
      }
    },
    login: async (root, args) => {
      const { username, password } = args

      try {
        const user = await User.findOne({ username })
        if (!user || password !== 's3cr3t') {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, config.SECRET) }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers?.authorization
    if (auth && auth.startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        config.SECRET
      )
      try {
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

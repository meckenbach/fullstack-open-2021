import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation createPerson($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

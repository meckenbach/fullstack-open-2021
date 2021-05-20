import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url }, token) => {
  const config = { headers: { 'Authorization': `bearer ${token}` } }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

const update = async (id, blogObject, token) => {
  const config = { headers: { 'Authorization': `bearer ${token}` } }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const remove = async (id, token) => {
  const config = { headers: { 'Authorization': `bearer ${token}` } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const blogService = { getAll, create, update, remove }

export default blogService
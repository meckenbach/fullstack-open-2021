import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url }, token) => {
  const config = {
    headers: {
      'Authorization': `bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

const blogService = { getAll, create }

export default blogService
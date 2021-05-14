import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const personService = {
    getAll,
    create,
    update,
    del
}

export default personService
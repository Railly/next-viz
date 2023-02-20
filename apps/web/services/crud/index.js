import axios from "axios"
import { API_BASE_URL } from "utils/constants"

const getUrl = (path, id) => {
  if (id) {
    return `${API_BASE_URL}/${path}/${id}`
  }
  return `${API_BASE_URL}/${path}`
}

const getUrlPagination = (path, queryParams) => {
  // return `${API_BASE_URL}${path}?page=${page}`
  if (typeof queryParams === "string") {
    return `${API_BASE_URL}/${path}?page=${queryParams}`
  }

  const queryParamsString = queryParams
    .map((param) => {
      return `${param.key}=${param.value}`
    })
    .join("&")

  return `${API_BASE_URL}/${path}?${queryParamsString}`
}

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return user?.token
}

const create = (path, data) => {
  return axios.post(getUrl(path), data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

const createFormData = (path, data) => {
  const token = getToken()
  return axios.post(getUrl(path), data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

const getAll = (path, queryParams) => {
  const token = getToken()
  if (queryParams) {
    return axios.get(getUrlPagination(path, queryParams), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  return axios.get(getUrl(path), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const getOne = (path, id) => {
  const token = getToken()
  return axios.get(getUrl(path, id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const update = (path, id, data) => {
  const token = getToken()
  return axios.put(getUrl(path, id), data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const updateFormData = (path, id, data) => {
  const token = getToken()
  const newUrl = id !== "" ? `${getUrl(path, id)}` : `${getUrl(path)}`

  return axios.put(newUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

const deleteOne = (path, id) => {
  const token = getToken()
  return axios.delete(getUrl(path, id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default {
  createFormData,
  updateFormData,
  create,
  getAll,
  getOne,
  update,
  deleteOne,
}

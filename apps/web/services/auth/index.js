import axios from "axios"
import { API_BASE_URL } from "utils/constants"

const baseUrl = `${API_BASE_URL}/login`
// const baseUrl = "http://167.114.50.84/login"

const login = async (credentials) => {
  return axios.post(baseUrl, credentials)
}

export default { login }

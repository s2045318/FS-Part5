import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log(credentials)
  const response = (await axios.post(baseUrl, credentials)).data
  console.log(response)
  return response
}

export default { login }
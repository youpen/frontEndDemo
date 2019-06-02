import axios from 'axios'
import { cfg } from '../config'

export async function login (action) {

  const {
    payload: {
      username,
      password,
    }
  } = action
  try {
    const res = await axios.post('api/v1/auth/token', {
      username,
      password
    })
    const { token } = res.data
    window.__token__ = token;
    localStorage.setItem('__token__', token);
  } catch (e) {
    console.log(e)
    throw new Error('sagaLogin API error')
  }
}

export async function register ({ username, password, avatar = 1, email = 2 }) {
  try {
    let res = await axios.post('api/v1/join', {
      username,
      password,
      avatar,
      email,
    })
    console.log(res)
    res = JSON.parse(res)
    const { token } = res.config.data
  } catch (e) {
    console.log(e)
    throw new Error('register API error')
  }
}
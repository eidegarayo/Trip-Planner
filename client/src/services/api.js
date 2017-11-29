/* global localStorage */
import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = 'Bearer ' + token
  return config
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('path')
}

export const register = (username, password, tripName, tripDays) => {
  const tripUrl = tripName.replace(/ /g, '-').toLowerCase()
  const url = `/register`
  const data = { username, password, tripName, tripDays, tripUrl }
  return axios.post(url, data)
}

export const userLogin = (username, password) => {
  const userLoginUrl = `/login`
  const data = { username, password }
  return axios.post(userLoginUrl, data)
}

export const getUserTripInfo = tripPathName => {
  const userTripUrl = `/api/trip-planner/${tripPathName}`
  return axios(userTripUrl)
}

export const updateTrip = (tripPath, tripRoute, tripAgenda) => {
  const tripUpdateUrl = `/api/trip-planner/${tripPath}`
  const data = { tripPath, tripRoute, tripAgenda }
  return axios.put(tripUpdateUrl, data)
}

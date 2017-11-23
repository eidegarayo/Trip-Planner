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
  return axios.post( url, data )

  // return new Promise((resolve, reject) =>
  //   resolve(userRegisterInfo)
  //   )
}

export const userLogin = (tripName, tripPassword) => {
  const tripUsername = tripName.replace(/ /g, '-').toLowerCase()
  const userLoginUrl = `/login`
  const userLoginInfo = axios.post(
    userLoginUrl,
    {
      username: tripUsername,
      password: tripPassword
    }
  )
  return new Promise((resolve, reject) =>
    resolve(userLoginInfo)
    )
}

export const getUserTripInfo = tripPathName => {
  const userTripUrl = `/api/trip-planner/${tripPathName}`
  const userTripInfo = axios(userTripUrl)
  return new Promise((resolve, reject) =>
    resolve(userTripInfo)
    )
}

export const updateTrip = (tripPath, tripRoute) => {
  const tripUpdateUrl = `/api/trip-planner/${tripPath}`
  const tripUpdate = axios.put(
    tripUpdateUrl,
    {
      tripPath: tripPath,
      tripRoute: tripRoute
    }
  )
  return new Promise((resolve, reject) =>
    resolve(tripUpdate)
  )
}

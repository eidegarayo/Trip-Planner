/* global localStorage */
import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('path')
}

export const setRegisterInfo = (tripName, tripDays, tripPassword) => {
  const tripPathName = tripName.replace(/ /g, '-').toLowerCase()
  const userRegisterUrl = `http://localhost:3005/register`
  const userRegisterInfo = axios.post(
    userRegisterUrl,
    {
      tripName: tripName,
      tripPathName: tripPathName,
      tripDays: tripDays,
      tripPassword: tripPassword
    }
  )
  return new Promise((resolve, reject) =>
    resolve(userRegisterInfo)
    )
}

export const userLogin = (tripName, tripPassword) => {
  const tripUsername = tripName.replace(/ /g, '-').toLowerCase()
  const userLoginUrl = `http://localhost:3005/login`
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
  const userTripUrl = `http://localhost:3005/trip-planner/${tripPathName}`
  const userTripInfo = axios(`${userTripUrl}`)
  return new Promise((resolve, reject) =>
    resolve(userTripInfo)
    )
}

export const updateTrip = (tripPath, tripRoute) => {
  const tripUpdateUrl = `http://localhost:3005/trip-planner/${tripPath}`
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

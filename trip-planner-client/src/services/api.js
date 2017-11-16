import axios from 'axios'

export const getUserTripInfo = tripPathName => {
  const userTripUrl = `http://localhost:3005/trip-planner/${tripPathName}`
  const userTripInfo = axios(`${userTripUrl}`)
  return new Promise((resolve, reject) =>
    resolve(userTripInfo)
    )
}

export const setRegisterInfo = (tripName, tripDays, tripPassword) => {
  const tripPathName = tripName.replace(/ /g, '-').toLowerCase()
  const userRegisterUrl = `http://localhost:3005/trip-planner/${tripPathName}`
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

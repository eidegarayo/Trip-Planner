import React from 'react'
import { Route } from 'react-router-dom'

import Home from './routes/public/Home'
import TripPlannerPage from './routes/private/TripPlannerPage'
import TripRoute from './routes/private/TripRoute'

const Main = () => (
  <div className='main'>
    <Route exact path='/' component={Home} />
    <Route exact path='/trip-planner/:tripName' component={TripPlannerPage} />
    <Route path='/trip-planner/:tripName/route' component={TripRoute} />
  </div>
)

export default Main

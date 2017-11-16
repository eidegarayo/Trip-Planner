import React from 'react'
import { Route } from 'react-router-dom'

import Home from './routes/public/Home'
import TripPlannerPage from './routes/private/TripPlannerPage'

const Main = () => (
  <div className='main'>
    <Route exact path='/' component={Home} />
    <Route path='/trip-planner/:tripName' component={TripPlannerPage} />
  </div>
)

export default Main

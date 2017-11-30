import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './routes/Home'
import TripPlannerPage from './routes/private/TripPlannerPage/'
import TripRoute from './routes/private/TripRoute'
import Suitcase from './routes/private/Suitcase'
import TripToPdf from './routes/private/TripToPdf'

const Main = () => (
  <div className='main'>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/trip-planner/:tripName' component={TripPlannerPage} />
      <Route path='/trip-planner/:tripName/route' component={TripRoute} />
      <Route path='/trip-planner/:tripName/suitcase' component={Suitcase} />
      <Route path='/trip-planner/:tripName/pdf' component={TripToPdf} />
    </Switch>
  </div>
)

export default Main

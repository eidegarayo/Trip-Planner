/* global localStorage */
import React, { Component } from 'react'
import PlacesWithStandaloneSearchBox from '../googleMaps/StandaloneSearchBox'
import Timeline from './Timeline'
import { getUserTripInfo } from '../../../../services/api'
import HeaderPrivate from '../HeaderPrivate'
import SaveTripButton from './SaveTripButton'
import DailyInfoForm from './DailyInfoForm'

class TripPlannerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tripTitle: '',
      tripPath: '',
      tripDays: '',
      tripAgenda: {
        1: ''
      },
      tripRoute: {
        1: {
          placeId: '',
          address: '',
          lat: '',
          lng: '',
          imgUrl: []
        }
      }
    }
    this.handleTripRoute = this.handleTripRoute.bind(this)
  }

  componentWillMount () {
    const pathName = localStorage.getItem('path')
    getUserTripInfo(pathName)
      .then(userTripInfo => {
        this.setState({
          tripTitle: userTripInfo.data[0].title,
          tripPath: userTripInfo.data[0].path,
          tripDays: userTripInfo.data[0].days,
          tripAgenda: userTripInfo.data[0].agenda,
          tripRoute: userTripInfo.data[0].itinerary
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  handleTripRoute (data) {
    const newDay = data[1]
    const { address, lat, lng, placeId, imgUrl } = data[0]
    let newTripRoute = this.state.tripRoute
    newTripRoute[newDay] = { address, lat, lng, placeId, imgUrl }
    this.setState({
      tripRoute: newTripRoute
    })
  }

  handleTripDailyInfo = (day, dailyInfo) => {
    const newTripAgenda = this.state.tripAgenda
    newTripAgenda[day] = dailyInfo 
    this.setState({
      tripAgenda: newTripAgenda
    })      
  }

  render () {
    const days = Array(this.state.tripDays).fill(1)
    return (
      <div id='trip'>
        <HeaderPrivate />
        <div className='container-fluid'>
          <div className='mainTitle'>
            <h1>{this.state.tripTitle}</h1>
            <SaveTripButton
              tripRoute={this.state.tripRoute}
              tripPath={this.state.tripPath}
              tripAgenda={this.state.tripAgenda}
            />
          </div>
          <div className='row'>
            <div className='col-md-5 mt-5'>
              <div id='accordion' role='tablist'>
                {
                  days.map((day, i) => {
                    let collapseName = 'collapse' + i
                    let collapseNameRef = '#collapse' + i
                    let tripRouteCity = ''
                    if (this.state.tripRoute[i + 1]) {
                      tripRouteCity = this.state.tripRoute[i + 1].address
                    }
                    return (
                      <div className='card' key={i}>
                        <div className='card-header' role='tab' id='headingTwo'>
                          <h5 className='mb-0'>
                            <a className='collapsed' data-toggle='collapse' href={collapseNameRef} aria-expanded='false' aria-controls='collapseTwo'>
                              <i className='material-icons'>place</i>
                              Día {i + 1}. {tripRouteCity}
                            </a>
                          </h5>
                        </div>
                        <div id={collapseName} className='collapse' role='tabpanel' aria-labelledby='headingTwo' data-parent='#accordion'>
                          <div className='card-body'>
                            <PlacesWithStandaloneSearchBox
                              day={i + 1}
                              placeholder='Ciudad'
                              handleTripRoute={this.handleTripRoute}
                              label='Ciudad'
                              loadingElement={<div style={{ height: `100%` }} />}
                            />
                            <hr />
                            <DailyInfoForm 
                              day={i + 1} 
                              handleTripDailyInfo={this.handleTripDailyInfo}
                              value={(this.state.tripAgenda[i + 1]) ? this.state.tripAgenda[i + 1] : ''}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div> { /* #accordion */ }
            </div>
            <div className='col-md-7'>
              <Timeline
                tripDays={this.state.tripDays}
                tripRoute={this.state.tripRoute}
                tripAgenda={this.state.tripAgenda}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripPlannerPage

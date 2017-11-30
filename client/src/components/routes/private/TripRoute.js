/* global google localStorage */

import React, { Component } from 'react'
import HeaderPrivate from './HeaderPrivate'
import { getUserTripInfo } from '../../../services/api'
import DirectionsMap from './googleMaps/GoogleMapDirections'
import PolylineMap from './googleMaps/GoogleMapPolyline'

class TripRoute extends Component {
  constructor () {
    super()
    this.state = {
      tripTitle: '',
      tripPath: '',
      tripDays: '',
      tripRoute: '',
      tripRouteMsg: '',
      tripDirections: '',
      tripRoutePolyline: ''
    }
  }

  async componentWillMount () {
    const pathName = localStorage.getItem('path')
    const userTripInfo = await getUserTripInfo(pathName)
    await this.setState ({
      tripTitle: userTripInfo.data[0].title,
      tripPath: userTripInfo.data[0].path,
      tripDays: userTripInfo.data[0].days,
      tripRoute: userTripInfo.data[0].itinerary
    })
    this.getTripDirections()
  }

  getTripDirections = () => {
    const route = this.state.tripRoute
    const days = +this.state.tripDays

    const DirectionsService = new google.maps.DirectionsService()

    let waypoints = []
    
    for (let i = 2; i < days; i++) {
      if (route[i]) {
        waypoints.push({location: new google.maps.LatLng(route[i].lat, route[i].lng), stopover: true})
      }
    }

    let destination
    for (let i = 2; i <= days; i++) {
      if (route[i]) {
        destination = new google.maps.LatLng(route[i].lat, route[i].lng)
      }
    }

    let routePolyline = []
    for (let i = 1; i <= days; i++) {
      if (route[i]) {
        routePolyline.push(new google.maps.LatLng(route[i].lat, route[i].lng))
      }
    }

    DirectionsService.route({
      origin: new google.maps.LatLng(route[1].lat, route[1].lng),
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          tripDirections: result
        })
      } else {
        console.error(`error fetching directions ${result}`)
        this.setState({
          tripRoutePolyline: routePolyline
        })
      }
    })
  }

  render () {
    let defaultLat = ''
    let defaultLng = ''
    if (this.state.tripRoute) {
      defaultLat = this.state.tripRoute[1].lat
      defaultLng = this.state.tripRoute[1].lng
    }
    let addresses = []
    for (let i = 1; i <= this.state.tripDays; i++) {
      if (this.state.tripRoute[i]) {
        addresses.push(this.state.tripRoute[i].address)
      }
    }
    return (
      <div className='route'>
        <HeaderPrivate />
        <div className='container-fluid'>
          <div className='mainTitle'>
            <h1>{this.state.tripTitle}</h1>
          </div>
          <div className='row'>
            <div className='col-md-9'>
            {
              (this.state.tripRoutePolyline)
              ?
                <PolylineMap
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div className='route-map img-thumbnail' style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  polyline={this.state.tripRoutePolyline}
                  defaultLat={defaultLat}
                  defaultLng={defaultLng}
                />

              : <DirectionsMap
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className='route-map img-thumbnail' style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                directions={this.state.tripDirections}
                defaultLat={defaultLat}
                defaultLng={defaultLng}
              />
            }
            </div>
            <div className='col-md-3'>
              <div className='card'>
                <p className='route-title'>DESTINOS</p>
                <ul className='list-group'>
                  {
                    addresses.map((address, i) => {
                      return (
                        <li key={i} className='list-group-item'>
                          <i className='material-icons'>place</i>
                          {address}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripRoute

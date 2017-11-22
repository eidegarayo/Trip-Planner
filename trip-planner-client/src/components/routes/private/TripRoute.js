/* global google localStorage */

import React, { Component } from 'react'
import HeaderPrivate from './HeaderPrivate'
import { getUserTripInfo } from '../../../services/api'
import DirectionsMap from './googleMaps/GoogleMapDirections'

class TripRoute extends Component {
  constructor () {
    super()
    this.state = {
      tripTitle: '',
      tripPath: '',
      tripDays: '',
      tripRoute: '',
      tripRouteMsg: '',
      tripDirections: ''
    }
    this.getTripDirections = this.getTripDirections.bind(this)
  }
  componentWillMount () {
    const pathName = localStorage.getItem('path')
    getUserTripInfo(pathName)
      .then(userTripInfo => {
        this.setState({
          tripTitle: userTripInfo.data[0].title,
          tripPath: userTripInfo.data[0].path,
          tripDays: userTripInfo.data[0].days,
          tripRoute: userTripInfo.data[0].itinerary
        })
      })
      .then(this.getTripDirections)
      .catch(function (error) {
        console.error(error)
      })
  }

  getTripDirections () {
    const route = this.state.tripRoute
    const days = +this.state.tripDays
    const DirectionsService = new google.maps.DirectionsService()
    let waypoints = []
    let destination
    for (let i = 2; i < days; i++) {
      if (route[i]) {
        waypoints.push({location: new google.maps.LatLng(route[i].lat, route[i].lng), stopover: true})
      }
    }
    for (let i = 2; i <= days; i++) {
      if (route[i]) {
        destination = new google.maps.LatLng(route[i].lat, route[i].lng)
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
          tripRouteMsg: '¡Ups! No tenemos información de ruta para tu itinerario'
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
    return (
      <div className='route'>
        <HeaderPrivate />
        <div className='container-fluid'>
          <div className='mainTitle'>
            <h1>{this.state.tripTitle}</h1>
            <div className='alert alert-danger' role='alert'>
              {this.state.tripRouteMsg}
            </div>
          </div>
          <DirectionsMap
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className='route-map' style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            directions={this.state.tripDirections}
            defaultLat={defaultLat}
            defaultLng={defaultLng}
          />
        </div>
      </div>
    )
  }
}

export default TripRoute

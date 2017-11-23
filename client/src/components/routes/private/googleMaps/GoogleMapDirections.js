/* global google */

import React from 'react'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const DirectionsMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      zoom={10}
      center={new google.maps.LatLng(props.defaultLat, props.defaultLng)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  )
})

export default DirectionsMap

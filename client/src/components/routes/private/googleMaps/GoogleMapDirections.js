/* global google */

import React from 'react'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const DirectionsMap = withGoogleMap((props) => {
  const { defaultLat, defaultLng, directions } = props
  return (
    <GoogleMap zoom={10} center={new google.maps.LatLng(defaultLat, defaultLng)} >
      {props.directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
})

export default DirectionsMap

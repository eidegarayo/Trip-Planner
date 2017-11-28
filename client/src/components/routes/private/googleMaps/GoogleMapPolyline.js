/* global google */

import React from 'react'
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps'

const PolylineMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      zoom={5}
      center={new google.maps.LatLng(props.defaultLat, props.defaultLng)}
    >
      <Polyline
        path={props.polyline}
        options={{
          strokeColor: '#FF5722',
          strokeOpacity: '1.0',
          strokeWeight: '5'
        }}
      />
    </GoogleMap>
  )
})

export default PolylineMap

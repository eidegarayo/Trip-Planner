import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const SimpleMap = withGoogleMap((props) => {
  const lat = props.lat
  const lng = props.lng
  return (
    <GoogleMap
      defaultZoom={10}
      center={{ lat: lat, lng: lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
    </GoogleMap>
  )
})

export default SimpleMap

import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const SimpleMap = withScriptjs(withGoogleMap((props) => {
  const lat = props.lat
  const lng = props.lng
  return (
    <GoogleMap
      defaultZoom={12}
      center={{ lat: lat, lng: lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
    </GoogleMap>
  )
}))

export default SimpleMap

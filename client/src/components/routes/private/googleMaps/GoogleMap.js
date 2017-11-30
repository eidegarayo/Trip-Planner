import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const SimpleMap = withGoogleMap((props) => {
  const { lat, lng } = props
  return (
    <GoogleMap defaultZoom={10} center={{ lat, lng }} >
      {props.isMarkerShown && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  )
})

export default SimpleMap

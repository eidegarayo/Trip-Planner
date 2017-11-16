import React from 'react'
import SimpleMap from './GoogleMap'

const Timeline = (props) => {
  const days = Array(props.tripDays + 1).fill(1)
  return (
    <div className='timeline'>
      {
        days.map((day, i) => {
          if (props.tripRoute[i]) {
            return (
              <div className='item' key={i}>
                <span><i className='material-icons'>done</i></span>
                <div>
                  Día {i}. {props.tripRoute[i].address}
                </div>
                <SimpleMap
                  isMarkerShown
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBaR45GQOEdXVrE20Rg75fHfw30YC9mhSw&v=3.exp&libraries=geometry,drawing,places'
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  lat={props.tripRoute[i].lat}
                  lng={props.tripRoute[i].lng}
                />
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default Timeline

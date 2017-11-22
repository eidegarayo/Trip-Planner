import React from 'react'
import SimpleMap from '../googleMaps/GoogleMap'

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
                <div className='col-md-6'>  
                  <SimpleMap
                    isMarkerShown
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className='img-thumbnail' style={{ height: `200px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    lat={props.tripRoute[i].lat}
                    lng={props.tripRoute[i].lng}
                  />
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default Timeline

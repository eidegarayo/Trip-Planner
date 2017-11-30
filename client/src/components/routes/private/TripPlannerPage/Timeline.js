import React from 'react'
import Masonry from 'react-masonry-component'
import SimpleMap from '../googleMaps/GoogleMap'

const Timeline = (props) => {
  const days = Array(props.tripDays + 1).fill(1)
  return (
    <div className='timeline'>
      {
        days.map((day, i) => {
          if (props.tripRoute[i]) {
            let imgUrl = props.tripRoute[i].imgUrl

            return (
              <div className='item' key={i}>
                <span><i className='material-icons'>done</i></span>
                <div className='item-title'>
                  Día {i}. {props.tripRoute[i].address}
                </div>
                <div className='row'>
                  <div className='col-lg-4'>
                    <SimpleMap
                      isMarkerShown
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div className='img-thumbnail' style={{ height: `200px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      lat={props.tripRoute[i].lat}
                      lng={props.tripRoute[i].lng}
                    />
                  </div>
                  <div className='col-lg-8 dailyInfo'>
                    <p className='agenda-title'>AGENDA DEL DÍA</p>
                    {
                      (props.tripAgenda[i]) ? props.tripAgenda[i].split('\n').map((item, key) => {
                        return <p className='dailyInfo-text' key={key}>{item}</p>
                      }) : ''
                    }
                  </div>
                </div>
                <Masonry className={'item-masonry row'}>
                  {
                    (typeof imgUrl !== 'string')
                    ? (
                      imgUrl.map((url, index) => {
                        return (
                          <div className='col-lg-4 col-sm-6 image-element-class' key={index}><img className='img-fluid' src={url} alt={props.tripRoute[i].address} /></div>
                        )
                      })
                      )
                      : (<div className='col-md-6'><img src={imgUrl} className='img-thumbnail img-fluid' alt={props.tripRoute[i].address} /></div>)
                  }
                </Masonry>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default Timeline

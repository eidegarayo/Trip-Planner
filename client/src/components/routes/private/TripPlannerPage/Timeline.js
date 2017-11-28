import React from 'react'
import Masonry from 'react-masonry-component';
import SimpleMap from '../googleMaps/GoogleMap'

const Timeline = (props) => {
  const days = Array(props.tripDays + 1).fill(1)
  return (
    <div className='timeline'>
      {
        days.map((day, i) => {
          if (props.tripRoute[i]) {
            let imgUrl = props.tripRoute[i].imgUrl
            let dailyInfo
            (props.tripAgenda[i]) ? dailyInfo = props.tripAgenda[i].replace(new RegExp('\r?\n','g'), '<br />') : ''

            return (
              <div className='item' key={i}>
                <span><i className='material-icons'>done</i></span>
                <div className='item-title'>
                  Día {i}. {props.tripRoute[i].address}
                </div>
                <div className='row'>
                
                
                  <div className='col-md-4'>
                    <SimpleMap
                      isMarkerShown
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div className='img-thumbnail' style={{ height: `200px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      lat={props.tripRoute[i].lat}
                      lng={props.tripRoute[i].lng}
                    />
                  </div>
                  <div className='col-md-8 dailyInfo'>
                  <p>AGENDA DEL DÍA</p>
                  {
                    props.tripAgenda[i].split('\n').map((item, key) => {
                      return <p className='dailyInfo-text' key={key}>{item}</p>
                    })
                  }
                </div>
                  </div>

                  <Masonry className={'item-masonry row'}>
                  {
                    (typeof imgUrl !== 'string')
                    ? (
                      imgUrl.map((url, i) => {
                        return (
                          <div className='col-md-4 image-element-class' key={i}><img className='img-fluid' src={url}  /></div>
                        )
                      })
                      )
                      : (<div className='col-md-4'><img src={imgUrl} className='img-thumbnail img-fluid' key={i} /></div>)
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

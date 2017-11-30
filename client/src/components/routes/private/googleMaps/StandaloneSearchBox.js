import React, { Component } from 'react'
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox'

class PlacesWithStandaloneSearchBox extends Component {
  constructor (props) {
    super(props)
    this.refs = {}
    this.state = {
      places: [],
      address: '',
      lat: 0,
      lng: 0,
      placeId: '',
      imgUrl: []
    }
  }

  onSearchBoxMounted = (ref) => {
    this.searchBox = ref
  }

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces()
    let getImgUrl = []
    
    if (places[0].photos) {
      for (let i = 0; i < places[0].photos.length; i++) {
        getImgUrl.push(places[0].photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300}))
      }
    }

    this.setState({
      places: places,
      address: places[0].formatted_address,
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
      placeId: places[0].place_id,
      imgUrl: getImgUrl
    })
    
    const { address, lat, lng, placeId, imgUrl } = this.state
    this.props.handleTripRoute(this.props.day, address, lat, lng, placeId, imgUrl)
  }

  render () {
    return (
      <div data-standalone-searchbox=''>
        <StandaloneSearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.bounds}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            type='text'
            className='form-control'
            placeholder={this.props.placeholder}
          />
        </StandaloneSearchBox>

      </div>
    )
  }
}

export default PlacesWithStandaloneSearchBox

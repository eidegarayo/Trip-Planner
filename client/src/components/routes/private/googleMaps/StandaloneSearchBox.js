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
      lng: 0
    }
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
  }

  onSearchBoxMounted (ref) {
    this.searchBox = ref
  }

  onPlacesChanged () {
    const places = this.searchBox.getPlaces()
    this.setState({
      places: places,
      address: places[0].formatted_address,
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng()
    })
    this.props.handleTripRoute([this.state.address, this.state.lat, this.state.lng, this.props.day])
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

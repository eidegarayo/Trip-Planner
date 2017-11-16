import React, { Component } from 'react'
import { updateTrip } from '../../../../services/api'

class SaveTripButton extends Component {
  constructor (props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (event) {
    event.preventDefault()
    let { tripPath, tripRoute } = this.props
    updateTrip(tripPath, tripRoute)
      .then()
      .catch(function (error) {
        console.error(error)
      })
  }

  render () {
    return (
      <button
        id='saveTripItinerary'
        type='button'
        className='btn btn-lg btn-raised btn-warning mr-2'
        onClick={this.handleOnClick}
      >
        GUARDAR CAMBIOS
      </button>
    )
  }
}

export default SaveTripButton

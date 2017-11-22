import React, { Component } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateTrip } from '../../../../services/api'

class SaveTripButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alert: null
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (event) {
    event.preventDefault()
    let { tripPath, tripRoute } = this.props
    updateTrip(tripPath, tripRoute)
      .then(this.getAlert())
      .catch(function (error) {
        console.error(error)
      })
  }

  getAlert () {
    console.log('getAlert')
    const alert = () => (
      <SweetAlert
        success
        title='¡Itinerario guardado!'
        onConfirm={() => this.hideAlert()}
        confirmBtnText='Continuar'
      >
        Tus cambios se han guardado
      </SweetAlert>
    )
    this.setState({
      alert: alert()
    })
  }

  hideAlert () {
    console.log('HIding alert...')
    this.setState({
      alert: null
    })
  }

  render () {
    return (
      <span>
        <button
          id='saveTripItinerary'
          type='button'
          className='btn btn-lg btn-raised btn-warning mr-2'
          onClick={this.handleOnClick}
        >
          GUARDAR CAMBIOS
        </button>
        {this.state.alert}
      </span>
    )
  }
}

export default SaveTripButton

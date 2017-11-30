import React, { Component } from 'react'
import AlertContainer from 'react-alert'
import { updateTrip } from '../../../../services/api'

class SaveTripButton extends Component {

  handleUpdateTrip = async (e) => {
    const { tripPath, tripRoute, tripAgenda } = this.props
    
    try {
      await updateTrip(tripPath, tripRoute, tripAgenda)
      this.showAlertSuccess()
    }
    catch(err) {
      this.showAlertError()
    }
  }

  showAlertSuccess = () => {
    this.msg.show('Tus cambios se han guardado', {
      type: 'success'
    })
  }

  showAlertError = () => {
    this.msg.show('Error, inténtalo de nuevo', {
      type: 'error'
    })
  }

  alertOptions = {
    offset: 20,
    position: 'top right',
    theme: 'light',
    time:5000,
    transition:'fade'
  }

  render () {
    return (
      <span>
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <button
          id='saveTripItinerary'
          type='button'
          className='btn btn-lg btn-raised btn-warning mr-2'
          onClick={this.handleUpdateTrip}
        >
          Guardar cambios
        </button>
      </span>
    )
  }
}

export default SaveTripButton

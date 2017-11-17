import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { setRegisterInfo } from '../../services/api'

class RegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tripName: '',
      tripPathName: '',
      tripDays: '',
      tripPassword: '',
      tripRegisterMsg: false,
      tripRegister: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  handleOnClick (event) {
    event.preventDefault()
    let { tripName, tripDays, tripPassword } = this.state
    setRegisterInfo(tripName, tripDays, tripPassword)
      .then(
        document.getElementById('form-register').className = 'd-none'
        )
      .then(
        document.getElementById('enter').className = 'btn btn-primary d-block'
        )
      .catch(function (error) {
        console.error(error)
      })
  }

  handleRedirect () {
    this.setState({
      tripRegister: true
    })
  }

  render () {
    const { tripRegister } = this.state
    if (tripRegister) {
      const pathName = this.state.tripName.replace(/ /g, '-').toLowerCase()
      const userTripPath = `/trip-planner/${pathName}`
      return (
        <Redirect to={userTripPath} />
      )
    }
    return (
      <div className='registerModal'>
        <button type='button' className='btn btn-lg btn-raised btn-warning' data-toggle='modal' data-target='#registerModal'>{this.props.text}</button>
        <div className='modal fade' id='registerModal' tabIndex='-1' role='dialog' aria-labelledby='registerModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='registerModalLabel'>Comienza tu aventura</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form id='form-register' onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='inputTripName'>Título de tu viaje</label>
                    <input
                      name='tripName'
                      type='text'
                      className='form-control'
                      id='inputTripName'
                      aria-describedby='tripName'
                      placeholder='Título de tu viaje'
                      value={this.state.tripName}
                      onChange={this.handleChange}
                      />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='inputTripDays'>¿Cuántos días dura tu aventura?</label>
                    <input
                      name='tripDays'
                      type='number'
                      className='form-control'
                      id='inputTripDays'
                      aria-describedby='tripDays'
                      min='1' max='30'
                      placeholder='Número de días'
                      value={this.state.tripDays}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='inputTripPassword'>Contraseña</label>
                    <input
                      name='tripPassword'
                      type='password'
                      className='form-control'
                      id='inputTripPassword'
                      placeholder='Contraseña'
                      value={this.state.tripPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type='checkbox' className='form-check-input' />
                      He leído y acepto las condiciones de uso
                    </label>
                  </div>
                  <div className='modal-footer'>
                    <button
                      id='register'
                      type='submit'
                      className='btn btn-primary'
                      onClick={this.handleOnClick}
                    >
                      Registrar el viaje
                    </button>
                  </div>
                </form>
                <button
                  id='enter'
                  className='btn btn-primary d-none'
                  onClick={this.handleRedirect}
                  data-dismiss='modal'
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterModal

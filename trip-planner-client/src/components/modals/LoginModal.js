import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tripName: '',
      tripPassword: '',
      tripLogin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
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
    this.setState({
      tripLogin: true
    })
  }
  render () {
    const { tripLogin } = this.state
    if (tripLogin) {
      const pathName = this.state.tripName.replace(/ /g, '-').toLowerCase()
      const userTripPath = `/trip-planner/${pathName}`
      console.log(userTripPath)
      return (
        <Redirect to={userTripPath} />
      )
    }
    return (
      <div className='loginModal'>
        <button type='button' className='btn btn-lg btn-raised btn-primary mr-2' data-toggle='modal' data-target='#loginModal'>{this.props.text}</button>
        <div className='modal fade' id='loginModal' tabIndex='-1' role='dialog' aria-labelledby='loginModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='loginModalLabel'>Inicia tu sesión</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.handleSubmit}>
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
                    <label htmlFor='inputTripPassword'>Contraseña</label>
                    <input
                      name='inputTripPassword'
                      type='password'
                      className='form-control'
                      id='inputTripPassword'
                      placeholder='Contraseña'
                      value={this.state.inputTripPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={this.handleOnClick}
                      data-dismiss='modal'
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginModal

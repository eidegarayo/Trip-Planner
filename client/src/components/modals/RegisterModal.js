/* global localStorage */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { register, userLogin } from '../../services/api'
import { saveToken } from '../../services/StorageService'

class RegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      tripName: '',
      tripDays: '',
      pathRedirect: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleRegister (event) {
    event.preventDefault()
    let { tripName, tripDays, password, username } = this.state
    
    register(username, password, tripName, tripDays)
      .then( () => { 
        document.getElementById('form-register').className = 'd-none' 
        document.getElementById('enter').className = 'btn btn-primary d-block'
      })
      .catch( error =>  console.error(error) )
  }

  handleRedirect () {
    const { username, password } = this.state
    userLogin(username, password)
      .then((response) => {
        let {token, path} = response.data
        return saveToken(token, path)
      })
      .then( ({ path }) => { this.setState({ pathRedirect: path }) })
      .catch( error => console.error(error) )
  }

  render () {
    const { pathRedirect } = this.state
    if (pathRedirect) {
      const userTripPath = `/trip-planner/${pathRedirect}`
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
                  <fieldset>
                    <legend>User Info</legend>
                    <div className='form-group'>
                      <label htmlFor='username'>Username</label>
                      <input
                        name='username'
                        type='text'
                        className='form-control'
                        id="username"
                        placeholder='Enter your username...'
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                        />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='password'>Contraseña</label>
                      <input
                        name='password'
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Enter your password...'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </fieldset>
                  
                  <fieldset>
                    <legend>Trip Info</legend>
                    <div className='form-group'>
                      <label htmlFor='inputTripName'>Un título original para tu viaje</label>
                      <input
                        name='tripName'
                        type='text'
                        className='form-control'
                        id='inputTripName'
                        aria-describedby='tripName'
                        placeholder='Título de tu viaje'
                        value={this.state.tripName}
                        onChange={this.handleChange}
                        required
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
                        required
                      />
                    </div>
                  </fieldset>
                  
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type='checkbox' className='form-check-input' required />
                      He leído y acepto las condiciones de uso
                    </label>
                  </div>
                  <div className='modal-footer'>
                    <button
                      id='register'
                      type='submit'
                      className='btn btn-primary'
                      onClick={this.handleRegister}
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

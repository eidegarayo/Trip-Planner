import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AlertContainer from 'react-alert'
import { register, userLogin } from '../../../../services/api'
import { saveToken } from '../../../../services/StorageService'

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
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleRegister = async (e) => {
    (e).preventDefault()
    
    const { username, password, tripName, tripDays } = this.state

    try {
      await register(username, password, tripName, tripDays)
      document.getElementsByClassName('form-register')[0].className = 'd-none'
      document.getElementById('enter').className = 'btn btn-primary d-block'
    } 
    catch(err) {
      this.showAlert()
    }
  }

  showAlert = () => {
    this.msg.show('El usuario ya existe, por favor elige otro.', {
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

  handleRedirect = async (e) => {
    const { username, password } = this.state

    const login = await userLogin(username, password)
    const { token, path } = login.data
    await saveToken(token, path)
    this.setState({
      pathRedirect: path
    })
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

        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

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
                
                <form onSubmit={this.handleRegister} className='form-register'>

                  <hr/>
                  
                  <div className='form-group row'>
                    <label htmlFor='username' className='col-sm-4 col-form-label'>Usuario</label>
                    <div className="col-sm-8">
                      <input
                        name='username'
                        type='text'
                        className='form-control'
                        placeholder='Escoge un nombre de usuario...'
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                        />
                      </div>
                  </div>

                  <div className='form-group row'>
                    <label htmlFor='password' className='col-sm-4 col-form-label'>Contraseña</label>
                    <div className="col-sm-8">
                      <input
                        name='password'
                        type='password'
                        className='form-control'
                        placeholder='Contraseña...'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <hr/>

                  <div className='form-group row'>
                    <label htmlFor='inputTripName' className='col-sm-4 col-form-label'>Título de tu viaje</label>
                    <div className="col-sm-8">
                      <input
                        name='tripName'
                        type='text'
                        className='form-control'
                        aria-describedby='tripName'
                        placeholder='Mi viaje destino a...'
                        value={this.state.tripName}
                        onChange={this.handleChange}
                        required
                        />
                      </div>
                  </div>

                  <div className='form-group row'>
                    <label htmlFor='inputTripDays' className='col-sm-8 col-form-label'>¿Cuántos días dura tu aventura?</label>
                    <div className="col-sm-4">
                      <input
                        name='tripDays'
                        type='number'
                        className='form-control'
                        aria-describedby='tripDays'
                        min='1' max='30'
                        placeholder='Número de días'
                        value={this.state.tripDays}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>

                  <hr />
                  
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type='checkbox' className='form-check-input' required />
                      <small>He leído y acepto las condiciones de uso</small>
                    </label>
                  </div>
                  <div className='modal-footer'>
                    <button
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

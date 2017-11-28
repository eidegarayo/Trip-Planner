import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AlertContainer from 'react-alert'
import { userLogin } from '../../../../services/api'
import { saveToken } from '../../../../services/StorageService'

class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      pathRedirect: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async (e) => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      const login = await userLogin(username, password)
      const { token, path } = login.data
      await saveToken(token, path)
      this.setState({
        pathRedirect: path
      })
    } 
    catch(err) {
      this.showAlert()
    }
  }

  showAlert = () => {
    this.msg.show('Usuario y/o contraseña erróneos', {
      type: 'error'
    })
  }

  alertOptions = {
    offset: 20,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'fade'
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
      <div className='loginModal'>
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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
                    <label htmlFor='username'>Usuario</label>
                    <input
                      name='username'
                      type='text'
                      className='form-control'
                      id='username'
                      placeholder='Tu nombre de usuario...'
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                      name='password'
                      type='password'
                      className='form-control'
                      id='password'
                      placeholder='Tu contraseña...'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={this.handleLogin}
                      id='login-button'
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

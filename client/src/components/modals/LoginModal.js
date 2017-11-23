/* global localStorage */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { userLogin } from '../../services/api'
import { saveToken } from '../../services/StorageService'

class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      pathRedirect: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin (event) {
    event.preventDefault()

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
      <div className=''>
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
                    <label htmlFor='username'>Username</label>
                    <input
                      name='username'
                      type='text'
                      className='form-control'
                      id='username'
                      placeholder='Your username...'
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
                      placeholder='Your Password...'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={this.handleLogin}
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

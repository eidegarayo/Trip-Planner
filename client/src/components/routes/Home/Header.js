import React from 'react'
import { Link } from 'react-router-dom'
import RegisterModal from './modals/RegisterModal'
import LoginModal from './modals/LoginModal'

const Header = () => (
  <header>
    <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
      <Link to='/' className='navbar-brand'>
        <h1>Cuaderno y boli</h1>
      </Link>
      <div className='navbar-nav'>
        <LoginModal text='Iniciar sesión' />
        <RegisterModal text='Registrar viaje' />
      </div>
    </nav>
  </header>
)

export default Header

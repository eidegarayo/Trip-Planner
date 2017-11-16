import React from 'react'
import RegisterModal from '../../modals/RegisterModal'
import LoginModal from '../../modals/LoginModal'
import { Link } from 'react-router-dom'

const HeaderPublic = () => (
  <header>
    <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
      <Link to='/' className='navbar-brand'>
        <img src='' width='' height='' className='d-inline-block align-top' alt='' />
        LOGOTIPO
      </Link>
      <div className='navbar-nav'>
        <LoginModal
          text='Iniciar sesión'
        />
        <RegisterModal
          text='Registrar viaje'
        />
      </div>
    </nav>
  </header>
)

export default HeaderPublic

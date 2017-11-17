import React from 'react'

const HeaderPublic = () => (
  <header>
    <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
      <img src='' width='' height='' className='d-inline-block align-top' alt='' />
        LOGOTIPO
      <div className='navbar-nav'>
        <button
          type='button'
          className='btn btn-primary btn-lg disabled mr-2'
        >
        Ver ruta
        </button>
        <button
          type='button'
          className='btn btn-primary btn-lg disabled mr-2'
        >
        Generar pdf
        </button>
        <button
          type='button'
          className='btn btn-lg btn-raised btn-primary'
        >
        Cerrar sesión
        </button>
      </div>
    </nav>
  </header>
)

export default HeaderPublic

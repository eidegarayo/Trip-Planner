/* global localStorage */
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../services/api'

const HeaderPublic = () => {
  const pathName = localStorage.getItem('path')
  const tripPlannerPath = `/trip-planner/${pathName}`
  const tripRoutePath = `/trip-planner/${pathName}/route`
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light justify-content-between'>
        <Link to={tripPlannerPath} className='navbar-brand'>
          <img src='' width='' height='' className='d-inline-block align-top' alt='' />
          LOGOTIPO
        </Link>
        <div className='navbar-nav'>
          <Link to={tripPlannerPath}>
            <button
              type='button'
              className='btn btn-primary btn-lg disabled mr-2'
            >
            Itinerario
            </button>
          </Link>
          <button
            type='button'
            className='btn btn-primary btn-lg disabled mr-2'
          >
          Maleta
          </button>
          <Link to={tripRoutePath}>
            <button
              type='button'
              className='btn btn-primary btn-lg disabled mr-2'
            >
            Ruta
            </button>
          </Link>
          <button
            type='button'
            className='btn btn-primary btn-lg disabled mr-2'
          >
          Generar pdf
          </button>
          <Link to='/'>
            <button
              type='button'
              className='btn btn-lg btn-raised btn-primary'
              onClick={logout}
            >
            Cerrar sesión
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default HeaderPublic

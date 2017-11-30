/* global localStorage */
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../services/api'

const HeaderPublic = () => {
  const pathName = localStorage.getItem('path')
  const tripPlannerPath = `/trip-planner/${pathName}`
  const tripRoutePath = `/trip-planner/${pathName}/route`
  const suitcasePath = `/trip-planner/${pathName}/suitcase`
  const pdfPath = `/trip-planner/${pathName}/pdf`
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <Link to={tripPlannerPath} className='navbar-brand'>
          <h1 className='brand'>Cuaderno y boli</h1>
        </Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse justify-content-end' id='navbarSupportedContent'>
          <div className='navbar-nav'>
            <Link to={tripPlannerPath} className='nav-item nav-link active'>
              <button
                type='button'
                className='btn btn-primary btn-lg disabled mr-2'
              >
              Planificador
              </button>
            </Link>
            <Link to={tripRoutePath} className='nav-item nav-link active'>
              <button
                type='button'
                className='btn btn-primary btn-lg disabled mr-2'
              >
              Itinerario
              </button>
            </Link>
            <Link to={suitcasePath} className='nav-item nav-link'>
              <button
                type='button'
                className='btn btn-primary btn-lg disabled mr-2'
              >
              Maleta
              </button>
            </Link>
            <Link to={pdfPath} className='nav-item nav-link'>
              <button
                type='button'
                className='btn btn-primary btn-lg disabled mr-2'
              >
              PDF
              </button>
            </Link>
            <Link to='/' className='nav-item nav-link'>
              <button
                type='button'
                className='btn btn-lg btn-raised btn-primary'
                onClick={logout}
              >
              Cerrar sesión
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderPublic

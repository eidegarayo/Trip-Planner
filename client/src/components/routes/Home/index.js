import React from 'react'
import Header from './Header'
import RegisterModal from './modals/RegisterModal'

const Home = () => (
  <div className='home'>
    <Header />
    <div id='callToAction' className='text-center'>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8 offset-md-2'>
              <h1 className='display-3'>Cuaderno y boli</h1>
              <p className='lead'>Cuaderno y boli es la manera gratuita, flexible y visual de organizar tu viaje.</p>
              <hr className='my-4' />
              <p>Deja de lado los cuadernos llenos de anotaciones inconexas, los papeles sueltos, la repetición de datos. Cuaderno y boli te permite ver el progreso de la organización de tu viaje de un solo vistazo.</p>
              <RegisterModal
                text='Regístra tu viaje. ¡Es gratis!'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Home

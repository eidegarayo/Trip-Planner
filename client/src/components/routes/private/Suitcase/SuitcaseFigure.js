import React, { Component } from 'react'

class SuitcaseFigure extends Component {
  constructor (props) {
    super(props)
  }

  handleOnClick = (e) =>  {
    const stikerName = e.target.id
    this.props.subject(stikerName)
  }

  render(){
    return(
      <div className='suitcase'>
        <div className='suitcase-front'>
          <div className='suitcase-handle'>
            <div className='suitcase-handle_inner'></div>
          </div>
          <div className='suitcase-front_body'>
            <div className='suitcase-front_inner'>
              <div className='suitcase-front_stiker_1' >
                <div className='suitcase-front_stiker_1_inner'>
                  <div className='stiker_stripe_1'></div>
                  <div className='stiker_stripe_2'></div>
                  <div className='stiker_square'><span id='Sanidad' onClick={this.handleOnClick} >SANIDAD</span></div>
                </div>
              </div>
              <div className='suitcase-front_stiker_2'>
                <div className='suitcase-front_stiker_2_inner'>
                  <div className='stiker_stripe_1'><span id='Equipaje' onClick={this.handleOnClick} >EQUIPAJE</span></div>
                </div>
              </div>
              <div className='suitcase-front_stiker_3'>
                <span id='Documentos' onClick={this.handleOnClick} >DOCUMENTOS</span>
              </div>
            </div>
            <div className='suitcase-front_stripe stripe_1'></div>
            <div className='suitcase-front_stripe stripe_2'></div>
            <div className='suitcase-front_corner corner_1'></div>
            <div className='suitcase-front_corner corner_2'></div>
            <div className='suitcase-front_corner corner_3'></div>
            <div className='suitcase-front_corner corner_4'></div>
          </div>  
        </div>
      </div>
      )}
  
  
}

export default SuitcaseFigure

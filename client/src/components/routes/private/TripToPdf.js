/* global localStorage */
import React, { Component } from 'react'
import pdfConverter from 'jspdf'
import html2canvas from 'html2canvas'
import { getUserTripInfo } from '../../../services/api'
import HeaderPrivate from './HeaderPrivate'

class TripToPdf extends Component {
  constructor () {
    super()
    this.state = {
      tripTitle: '',
      tripDays: '',
      tripAgenda: {},
      tripRoute: {}
    }
  }

  async componentWillMount () {
    const pathName = localStorage.getItem('path')
    const userTripInfo = await getUserTripInfo(pathName)
    this.setState({
      tripTitle: userTripInfo.data[0].title,
      tripDays: userTripInfo.data[0].days,
      tripAgenda: userTripInfo.data[0].agenda,
      tripRoute: userTripInfo.data[0].itinerary
    })
  }

  downloadPdf = () => {
    const content = document.getElementById('pdfContent')
    html2canvas(content)
      .then((canvas) => {
        const contentImg = canvas.toDataURL('image/png')
        const pdf = new pdfConverter()
        pdf.addImage(contentImg, 'JPEG', 0, 0)
        // pdf.output('dataurlnewwindow')
        pdf.save('viaje.pdf')
      })
}

  render () {
    const days = Array(this.state.tripDays).fill(1)
    return (
      <div>
        <HeaderPrivate />
        <div className='container pdf'>          
          <button className='btn btn-lg btn-info btn-raised mt-4 mb-4' onClick={this.downloadPdf}>Guardar PDF</button>
          <div id='pdfContent'>
          <h1 className='text-center text-uppercase m-2'>{this.state.tripTitle}</h1>
          <div className='row'>
          {
            days.map((day, i) => {
              let tripRouteCity = ''
              if (this.state.tripRoute[i + 1]) {
                tripRouteCity = this.state.tripRoute[i + 1].address
              }
              return (
                <div className='col-md-4' key={i}>
                  <div className='card-pdf mb-4'>
                    <p className='card-pdf-header'>Día {i + 1} - {tripRouteCity}</p>
                    <div className='card-pdf-body'>
                      <p className='card-pdf-title'>Agenda</p>
                      <div className='card-pdf-text'>
                      {
                        (this.state.tripAgenda[i + 1]) ? this.state.tripAgenda[i + 1].split('\n').map((item, key) => {
                            return <p className='dailyInfo-text' key={key}>{item}</p>
                          }) : ''
                      }
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripToPdf

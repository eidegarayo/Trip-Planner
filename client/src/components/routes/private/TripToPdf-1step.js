/* global localStorage */
import React, { Component } from 'react'
import pdfConverter from 'jspdf'
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

  pdfSave = () => {
    const days = Array(this.state.tripDays).fill(1)
    const content = days.map((day, i) => {
      let address
      (this.state.tripRoute[i + 1]) 
        ? address = this.state.tripRoute[i + 1].address
        : address = 'Por decidir'
      let agenda
      (this.state.tripAgenda[i + 1])
          ? agenda = this.state.tripAgenda[i + 1]
          : agenda = ''
      return (
        'Día ' + (i + 1) + ' - ' + address + 
        '\n' + 'Agenda \n' + agenda
        )
    })
    console.log(content)
    const pdfFile = new pdfConverter ('p', 'pt', 'a4')
    pdfFile.setFontSize(14)
    pdfFile.text(40, 40, this.state.tripTitle)
    pdfFile.line(40, 80,  550)
    pdfFile.setFontSize(12)
    pdfFile.text(40, 60, content)

    pdfFile.save(this.state.tripTitle)
}

  render () {
    const days = Array(this.state.tripDays).fill(1)
    return (
      <div className='pdf'>
        <HeaderPrivate />
        <div className='container'>
          <h1 className='text-center m-5 d-inline-block text-uppercase'>{this.state.tripTitle}</h1>
          <button className='btn btn-lg btn-info btn-raised' onClick={this.pdfSave}>Download PDF</button>
          <div className='row'>
          {
            days.map((day, i) => {
              let tripRouteCity = ''
              if (this.state.tripRoute[i + 1]) {
                tripRouteCity = this.state.tripRoute[i + 1].address
              }
              return (
                <div className='col-md-4' key={i}>
                  <div className='card mb-4'>
                    <h4 className='card-header'>Día {i + 1} - {tripRouteCity}</h4>
                    <div className='card-body'>
                      <h4 className='card-title'>Agenda</h4>
                      <div className='card-text'>
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
    )
  }
}

export default TripToPdf

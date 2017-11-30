import React, { Component } from 'react'
import { getUserTripInfo } from '../../../../services/api'
import HeaderPrivate from '../HeaderPrivate'
import SuitcaseFigure from './SuitcaseFigure'
import SuitcaseInfoCard from './SuitcaseInfoCard'

class Suitcase extends Component {
  constructor () {
    super()
    this.state = {
      tripTitle: '',
      suitcaseSubject: ''
    }
  }

  async componentWillMount () {
    const pathName = localStorage.getItem('path')
    const userTripInfo = await getUserTripInfo(pathName)
    this.setState({
      tripTitle: userTripInfo.data[0].title
    })
  }

  setSuitcaseSubject = (stikerName) => {
    let subject = '';
    (stikerName) ? subject = stikerName : subject = ''
    this.setState({
      suitcaseSubject: subject
    })
  }

  render () {
    return (
      <div className='tripSuitcase'>
        <HeaderPrivate />
        <div className='container'>
          <div className='mainTitle'>
            <h1>{this.state.tripTitle}</h1>
          </div>
          <div className='row'>
            <div className='col-lg-7'>
              <SuitcaseFigure subject={this.setSuitcaseSubject}/>
            </div>
            <div className='col-lg-5 mt-5'>
              <SuitcaseInfoCard 
                subject={this.state.suitcaseSubject}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Suitcase

import React, { Component } from 'react'

class DailyInfoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyInfo: ''
    }
  }

  componentDidMount(){
    this.setState({
      dailyInfo: this.props.value
    })
  }
  componentWillReceiveProps(nextprops) {
    //console.log(nextprops)
    this.setState({
      dailyInfo: nextprops.value
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { dailyInfo } = this.state
    const day = this.props.day
    this.setState ({
      dailyInfo: dailyInfo
    })
    this.props.handleTripDailyInfo(day, dailyInfo)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='dailyInfo' className='text-muted'>¿Qué vas a hacer este día?</label>
          <textarea 
            name='dailyInfo'
            className='form-control' 
            id='dailyInfo'
            rows='3'
            value={this.state.dailyInfo}
            onChange={this.handleChange}
          />
          </div>
        <div className='text-right'>
          <button type='submit' className='btn btn-primary'>Añadir</button>
        </div>
      </form>
    )
  }
}

export default DailyInfoForm

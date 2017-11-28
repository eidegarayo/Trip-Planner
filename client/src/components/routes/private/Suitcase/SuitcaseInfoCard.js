import React from 'react'
import suitcaseData from '../../../../data/suitcaseData.json'

const SuitcaseInfoCard = (props) => {
  const subjectData = suitcaseData.find( (item) => {
    return item.subject === props.subject
  })
  
return(
    (props.subject) ? (
        <div className='card'>
          <div className='card-header'>
            Acuérdate de...
          </div>
          <div className='card-body'>
            <h4 className='card-title'>{subjectData.subject}</h4>
            <a href={subjectData.links[0][1]} target='_blank'><p className='card-text'>{subjectData.links[0][0]}</p></a>
          </div>
        </div>
    )
      : <div></div>)

}

export default SuitcaseInfoCard

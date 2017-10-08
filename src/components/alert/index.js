import React from 'react'

class Alert extends React.Component {
  componentDidMount () {
    this.props.sayAlert(this.props.alertObj.audioMessage)
  }
  render () {
    return (
      <div className='Alert'>
        <p style={{textAlign: 'right'}}>{this.props.alertObj.time}</p>
        <p><strong>{this.props.alertObj.alertType}</strong> {this.props.alertObj.context}</p>
        <p>{this.props.alertObj.location}</p>
        <hr />
      </div>
    )
  }
}

export default Alert

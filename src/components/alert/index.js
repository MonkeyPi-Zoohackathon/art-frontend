import React from 'react'

class Alert extends React.Component {
  componentWillMount () {
    this.props.sayAlert(this.props.alertObj.audioMessage)
  }
  render () {
    return (
      <div>
        <p style={{textAlign: 'right'}}>{this.props.alertObj.time}</p>
        <h2>{this.props.alertObj.alertType}</h2>
        <h3>{this.props.alertObj.context}</h3>
        <p>{this.props.alertObj.location}</p>
        <hr />
      </div>
    )
  }
}

export default Alert

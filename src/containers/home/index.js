import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import Alert from '../../components/alert'
import ToneListener from '../../components/toneListener'
import {
  sayAlert,
  addAlert,
  respondToAlert
} from '../../actions/alertsActions'
import Websocket from 'react-websocket'
import mapImage from './map.png'

const mapStyles = {
  width: '100%',
  height: '500px',
  backgroundColor: '#eee',
  overflow: 'hidden'
}
const mapImgStyles = {
  height: '100%',
  right: '0'
}

class Home extends React.Component {
  handleData (data) {
    const result = JSON.parse(data)
    const camelCaseResult = {
      alertType: result['alert_type'],
      time: result['time'],
      location: result['location'],
      context: result['context'],
      audioMessage: result['audio_message']
    }
    this.props.addAlert(camelCaseResult)
  }

  render () {
    return (
      <Grid>
        <ToneListener respondToAlert={this.props.respondToAlert} />
        <Row className='show-grid'>
          <Col xs={12}>
            <h1>Alerts</h1>
          </Col>
        </Row>
        <Row className='show-grid'>
          <Col xs={6}>
            {/*<Alert
              alertObj={{
                alertType: 'CAMERA ALERT',
                time: ' 0545 UTC  09/10/2017',
                location: '-2.987131202876079 38.265728355667996',
                context: ' LABELLED AS "FALSE TRIGGER"',
                audioMessage: 'ALERT ALERT ALERT'
              }}
              sayAlert={this.props.sayAlert}
            />
            <Alert
              alertObj={{
                alertType: 'CAMERA ALERT',
                time: ' 0545 UTC  09/10/2017',
                location: '-2.987131202876079 38.265728355667996',
                context: ' LABELLED AS "FALSE TRIGGER"',
                audioMessage: 'ALERT ALERT ALERT'
              }}
              sayAlert={this.props.sayAlert}
            />*/}
            {this.props.alerts.map((alert) =>
              <Alert
                alertObj={alert}
                sayAlert={this.props.sayAlert}
              />
            )}
          </Col>
          <Col xs={6}>
            <div style={mapStyles}>
              <img src={mapImage} style={mapImgStyles} alt='Map' />
            </div>
          </Col>
        </Row>
        <Websocket
          url='ws://172.16.0.50:9998'
          onMessage={this.handleData.bind(this)}
          debug
        />
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts.alerts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  sayAlert: (speech) => sayAlert(speech),
  addAlert: (alertObj) => addAlert(alertObj),
  respondToAlert: (ranger, intent) => respondToAlert(ranger, intent)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

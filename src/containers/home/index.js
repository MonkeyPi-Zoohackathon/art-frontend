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
import { sayAlert, addAlert } from '../../actions/alertsActions'
import Websocket from 'react-websocket'

const mapStyles = {
  width: '100%',
  height: '500px',
  backgroundColor: '#eee'
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
        <Row className='show-grid'>
          <Col xs={12}>
            <h1>Alerts</h1>
          </Col>
        </Row>
        <Row className='show-grid'>
          <Col xs={8}>
            {this.props.alerts.map((alert) =>
              <Alert
                alertObj={alert}
                sayAlert={this.props.sayAlert}
              />
            )}
          </Col>
          <Col xs={4}>
            <div style={mapStyles}>
              <p>Map goes here</p>
            </div>
          </Col>
        </Row>
        <Websocket
          url='ws://172.16.0.67:9998'
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
  addAlert: (alertObj) => addAlert(alertObj)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

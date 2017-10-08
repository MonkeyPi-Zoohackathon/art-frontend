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
        <ToneListener />
        <Row className='show-grid'>
          <Col xs={12}>
            <h1>Alerts</h1>
          </Col>
        </Row>
        <Row className='show-grid'>
          <Col xs={6}>
            {this.props.alerts.map((alert) =>
              <Alert
                alertObj={alert}
                sayAlert={this.props.sayAlert}
              />
            )}
          </Col>
          <Col xs={6}>
            <div style={mapStyles}>
              <iframe
                title='Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31884.361019236538!2d37.24325773691526!3d-2.6520156980678147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18309e7455555555%3A0x8405eed269adf949!2sAmboseli+National+Park!5e0!3m2!1sen!2suk!4v1507408546345'
                width='600'
                height='450'
                frameborder='0'
                style={mapStyles}
              />
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

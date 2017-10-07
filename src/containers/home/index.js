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
import { sayAlert } from '../../actions/alertsActions'

const mapStyles = {
  width: '100%',
  height: '500px',
  backgroundColor: '#eee'
}

const Home = props => (
  <Grid>
    <Row className='show-grid'>
      <Col xs={12}>
        <h1>Alerts</h1>
      </Col>
    </Row>
    <Row className='show-grid'>
      <Col xs={8}>
        {props.alerts.slice(0).reverse().map((alert) =>
          <Alert
            alertObj={alert}
            sayAlert={props.sayAlert}
          />
        )}
      </Col>
      <Col xs={4}>
        <div style={mapStyles}>
          <p>Map goes here</p>
        </div>
      </Col>
    </Row>
  </Grid>
)

const mapStateToProps = state => ({
  alerts: state.alerts.alerts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  sayAlert: (speech) => sayAlert(speech)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

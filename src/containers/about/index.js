import React from 'react'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'

export default () => (
  <Grid>
    <Row className='show-grid'>
      <Col xs={12} md={12}>
        <h1>About us</h1>
      </Col>
    </Row>
    <Row className='show-grid'>
      <Col xs={12}>
        <p>Team MonkeyPi rock!</p>
      </Col>
    </Row>
  </Grid>
)

import React from 'react'
import { Route, Link } from 'react-router-dom'
import {
  Grid,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import Home from '../home'
import About from '../about'

const App = () => (
  <Grid>
    <Row className='show-grid'>
      <Col xs={12}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>ART</Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem>
              <Link to='/'>Alerts</Link>
            </NavItem>
            <NavItem>
              <Link to='/about-us'>About</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <main>
          <Route exact path='/' component={Home} />
          <Route exact path='/about-us' component={About} />
        </main>
      </Col>
    </Row>
  </Grid>
)

export default App

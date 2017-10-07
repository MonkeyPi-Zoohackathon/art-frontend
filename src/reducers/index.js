import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import alertsReducer from './alertsReducer'

export default combineReducers({
  routing: routerReducer,
  alerts: alertsReducer
})

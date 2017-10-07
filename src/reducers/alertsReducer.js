import {
  ADD_ALERT
} from '../actions/alertsActions'

const initialState = {
  alerts: []
}

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            alertType: action.alertType,
            time: action.time,
            location: action.location,
            context: action.context,
            audioMessage: action.audioMessage
          }
        ]
      }
    default:
      return state
  }
}

export default alertsReducer

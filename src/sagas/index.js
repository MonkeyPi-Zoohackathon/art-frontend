import {
  all,
  call,
  select,
  takeLatest
} from 'redux-saga/effects'
import {
  SAY_ALERT,
  RESPOND_TO_ALERT
} from '../actions/alertsActions'
import { speak } from '../util/speak'

export function * rootSaga () {
  yield all([
    takeLatest(SAY_ALERT, sayAlert),
    takeLatest(RESPOND_TO_ALERT, respondToAlert)
  ])
}

function * sayAlert (action) {
  console.log(action.speech)
  yield call(speak, action.speech)
}

function * respondToAlert (action) {
  const alerts = yield select(state => state.alerts.alerts)
  const lastAlert = alerts[alerts.length - 1]
  console.log(lastAlert)

  const speech = `${action.ranger} ${action.intent} the most recent ${lastAlert.alertType}`
  yield call(speak, speech)
}

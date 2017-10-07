import { all, takeLatest } from 'redux-saga/effects'
import {
  SAY_ALERT
} from '../actions/alertsActions'

export function * rootSaga () {
  yield all([
    takeLatest(SAY_ALERT, sayAlert)
  ])
}

function * sayAlert (action) {
  console.log(action.speech)

  const speech = new SpeechSynthesisUtterance(action.speech) // eslint-disable-line
  yield window.speechSynthesis.speak(speech)
}

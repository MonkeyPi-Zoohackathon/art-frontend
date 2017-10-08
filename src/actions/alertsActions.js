export const SAY_ALERT = 'SAY_ALERT'
export const ADD_ALERT = 'ADD_ALERT'
export const RESPOND_TO_ALERT = 'RESPOND_TO_ALERT'

export const sayAlert = speech => ({
  type: SAY_ALERT,
  speech
})

export const addAlert = ({
  alertType = 'CAMERA ALERT',
  time = ' 0545 UTC  09/10/2017',
  location = '-2.987131202876079 38.265728355667996',
  context = ' LABELLED AS "FALSE TRIGGER"',
  audioMessage = 'ALERT ALERT ALERT'
}) => ({
  type: ADD_ALERT,
  alertType,
  time,
  location,
  context,
  audioMessage
})

export const respondToAlert = (ranger, intent) => {
  console.log(ranger, intent)
  return ({
    type: RESPOND_TO_ALERT,
    ranger,
    intent
  })
}

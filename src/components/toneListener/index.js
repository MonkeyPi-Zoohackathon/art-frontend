import React from 'react'
import Goertzel from 'goertzeljs/src/goertzel'
import DTMF from 'goertzeljs/src/dtmf'

class ToneListener extends React.Component {
  constructor () {
    super()

    this.listenForTone = this.listenForTone.bind(this)

    if (!navigator.getUserMedia) navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, this.listenForTone, function (e) {
        window.alert('Error capturing audio.')
      })
    } else {
      console.error('getUserMedia not supported in this browser.')
    }
  }

  listenForTone (e) {
    let audioContext = window.AudioContext || window.webkitAudioContext
    let context = new audioContext()
    let volume = context.createGain()
    let audioInput = context.createMediaStreamSource(e)
    audioInput.connect(volume)
    let bufferSize = 512
    let recorder = context.createScriptProcessor(bufferSize, 1, 1)
    let dtmf = new DTMF({
      sampleRate: context.sampleRate,
      repeatMin: 6,
      downsampleRate: 1,
      energyThreshold: 0.005,
      filter: function (e) {
        return !Goertzel.Utilities.doublePeakFilter(e.energies['high'], e.energies['low'], 1.4)
      }
    })
    dtmf.on('decode', function (value) {
      if (value != null) {
        console.log(value)
      }
    })
    recorder.onaudioprocess = function (e) {
      var buffer = e.inputBuffer.getChannelData(0)
      dtmf.processBuffer(buffer)
    }
    volume.connect(recorder)
    recorder.connect(context.destination) 
  }

  render () {
    return null
  }
}

export default ToneListener

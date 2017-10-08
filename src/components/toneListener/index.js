import React from 'react'
import Goertzel from 'goertzeljs/src/goertzel'
import DTMF from 'goertzeljs/src/dtmf'

class ToneListener extends React.Component {
  constructor () {
    super()

    this.state = {
      lastTone: ''
    }

    this.listenForTone = this.listenForTone.bind(this)
    this.checkTone = this.checkTone.bind(this)

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
    dtmf.on('decode', value => {
      if (value != null) {
        this.checkTone(value)
      }
    })
    recorder.onaudioprocess = function (e) {
      var buffer = e.inputBuffer.getChannelData(0)
      dtmf.processBuffer(buffer)
    }
    volume.connect(recorder)
    recorder.connect(context.destination)
  }

  checkTone (tone) {
    if (tone === this.state.lastTone) {
      switch (tone) {
        case '1':
          this.props.respondToAlert('Ranger 1', 'Will investigate')
          break
        case '2':
          this.props.respondToAlert('Ranger 1', 'Will not investigate')
          break
        case '3':
          this.props.respondToAlert('Ranger 1', 'Resolved issue')
          break
        case '7':
          this.props.respondToAlert('Ranger 3', 'Will investigate')
          break
        case '8':
          this.props.respondToAlert('Ranger 3', 'Will not investigate')
          break
        case '9':
          this.props.respondToAlert('Ranger 3', 'Resolved issue')
          break
        default:
          break
      }
    }
    this.setState({lastTone: tone})
  }

  render () {
    return null
  }
}

export default ToneListener

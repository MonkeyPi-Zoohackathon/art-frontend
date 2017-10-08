export const speak = speech => {
  const utterance = new SpeechSynthesisUtterance(speech) // eslint-disable-line
  window.speechSynthesis.speak(utterance)
}

function getAudioContext() {
  if(!window.audioContext)
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return window.audioContext;
}

function log(obj) {
  var element = document.getElementsByTagName('pre')[0];
  element.innerHTML += obj + '\n';
  element.scrollTop = element.scrollHeight;
}

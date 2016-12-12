function sinePeriodic() {
  var context = getAudioContext()
  ,      real = new Float32Array([0, 1])
  ,      imaj = new Float32Array([0, 0])
  ,  sinewave = context.createPeriodicWave(real, imaj)
  ,   sineosc = context.createOscillator();

  sineosc.setPeriodicWave(sinewave);
  sineosc.frequency.value = 440;
  sineosc.connect(context.destination);
  sineosc.start(audioContext.currentTime);
  sineosc.stop(audioContext.currentTime + 1);

  log('Context Sample rate: ' + context.sampleRate + 'Hz');
  log('Oscillator frequency: ' + sineosc.frequency.value + 'Hz');
  log('---');
};

function sineOsc() {
  var context = getAudioContext()
  ,   sineosc = context.createOscillator();

  sineosc.type = 'sine';
  sineosc.frequency.value = 440;
  sineosc.connect(context.destination);
  sineosc.start(audioContext.currentTime);
  sineosc.stop(audioContext.currentTime + 1);

  log('Context Sample rate: ' + context.sampleRate + 'Hz');
  log('Oscillator frequency: ' + sineosc.frequency.value + 'Hz');
  log('---');
}

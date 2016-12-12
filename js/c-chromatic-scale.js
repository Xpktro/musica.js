function chromaticScale() {
  var        context = getAudioContext()
  ,      currentTime = audioContext.currentTime
  ,         duration = 0.5
  , twelfthRootOfTwo = Math.pow(2, 1/12)
  , currentFrequency = 220
  ,      frequencies = [currentFrequency];

  for (var i = 0; i < 12; i++) {
    currentFrequency *= twelfthRootOfTwo;
    frequencies.push(currentFrequency);
  }

  frequencies.forEach(function(frequency, index) {
    var sineosc = context.createOscillator()
    , startTime = currentTime + (index * duration);
    sineosc.type = 'sine';
    sineosc.frequency.value = frequency;
    sineosc.connect(context.destination);
    sineosc.start(startTime);
    sineosc.stop(startTime + duration);
    sineosc.onended = function(){
      log('Finished ' + frequency.toFixed(2) + 'Hz tone.');
      if(index == frequencies.length - 1)
        log('---');
    };
  });

  log('Playing chromatic scale...');
}

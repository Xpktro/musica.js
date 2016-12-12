function majorScale() {
  var        context = getAudioContext()
  ,      currentTime = audioContext.currentTime
  ,         duration = 1
  , twelfthRootOfTwo = Math.pow(2, 1/12)
  , currentFrequency = 220
  ,      frequencies = [currentFrequency];

  for (var i = 0; i < 12; i++) {
    currentFrequency *= twelfthRootOfTwo;
    frequencies.push(currentFrequency);
  }

  var           TONE = 2
  ,         SEMITONE = 1
  ,            scale = [TONE, TONE, SEMITONE, TONE, TONE, TONE, SEMITONE]
  , currentFrequency = 0
  , scaleFrequencies = [frequencies[0]];

  scale.forEach(function (interval) {
    currentFrequency += interval;
    scaleFrequencies.push(frequencies[currentFrequency]);
  });

  scaleFrequencies.forEach(function(frequency, index) {
    var sineosc = context.createOscillator()
    , startTime = currentTime + (index * duration);
    sineosc.type = 'sine';
    sineosc.frequency.value = frequency;
    sineosc.connect(context.destination);
    sineosc.start(startTime);
    sineosc.stop(startTime + duration);
    sineosc.onended = function(){
      log('Finished ' + frequency.toFixed(2) + 'Hz tone.');
      if(index == scaleFrequencies.length - 1)
        log('---');
    };
  });

  log('Playing major scale...');
}

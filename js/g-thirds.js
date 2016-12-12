function thirds() {
  var        context = getAudioContext()
  ,      currentTime = audioContext.currentTime
  ,         duration = 0.5
  , twelfthRootOfTwo = Math.pow(2, 1/12)
  , currentFrequency = 220
  ,      frequencies = [currentFrequency];

  for (var i = 0; i < 24; i++) {
    currentFrequency *= twelfthRootOfTwo;
    frequencies.push(currentFrequency);
  }

  var           TONE = 2
  ,         SEMITONE = 1
  ,            scale = [TONE, TONE, SEMITONE, TONE, TONE, TONE, SEMITONE,
                        TONE, TONE, SEMITONE, TONE, TONE, TONE, SEMITONE]
  ,            notes = [frequencies[0]]
  , currentFrequency = 0;
  while(scale.length > 0) {
    var group = scale.splice(0, 2);
    currentFrequency += group[0] + group[1];
    notes.push(frequencies[currentFrequency]);
  }

  notes.forEach(function(frequency, index) {
    var sineosc = context.createOscillator()
    , startTime = currentTime + (index * duration);
    sineosc.type = 'sine';
    sineosc.frequency.value = frequency;
    sineosc.connect(context.destination);
    sineosc.start(startTime);
    sineosc.stop(startTime + duration);
    sineosc.onended = function(){
      log('Finished ' + frequency.toFixed(2) + 'Hz tone.');
      if(index == notes.length - 1)
        log('---');
    };
  });

  log('Playing thirds...');
}

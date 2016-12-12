function scaleModes() {
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

  var    TONE = 2
  ,  SEMITONE = 1
  ,     notes = []
  ,      mode = [TONE, TONE, SEMITONE, TONE, TONE, TONE, SEMITONE]
  , modeStart = 0;

  for (var i = 0; i < 8; i++) {
    var currentFrequency = modeStart;
    notes.push(frequencies[currentFrequency]);

    mode.forEach(function (interval) {
      currentFrequency += interval;
      notes.push(frequencies[currentFrequency]);
    });

    modeStart += mode[0];
    mode.push(mode.shift());
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
      if(index == notes.length - 1) {
        log('---');
      } else if((index + 1) % 8 == 0) {
        log('-');
      }
    };
  });

  log('Playing scale modes...');
}

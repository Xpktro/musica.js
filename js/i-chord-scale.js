function chordScale() {
  var        context = getAudioContext()
  ,      currentTime = audioContext.currentTime
  ,         duration = 1
  , twelfthRootOfTwo = Math.pow(2, 1/12)
  , currentFrequency = 220
  ,      frequencies = [currentFrequency];

  for (var i = 0; i < 24; i++) {
    currentFrequency *= twelfthRootOfTwo;
    frequencies.push(currentFrequency);
  }

  var     TONE = 2
  ,   SEMITONE = 1
  ,      scale = [TONE, TONE, SEMITONE, TONE, TONE, TONE, SEMITONE]
  ,     chords = []
  , chordStart = 0;

  for (var i = 0; i < 8; i++) {
    var currentFrequency = chordStart
    ,              notes = [frequencies[currentFrequency]]
    ,         chordScale = scale.slice();

    while(notes.length < 3) {
      var group = chordScale.splice(0, 2);
      currentFrequency += group[0] + group[1];
      notes.push(frequencies[currentFrequency]);
    }

    chords.push(notes);
    chordStart += scale[0];
    scale.push(scale.shift());
  }

  chords.forEach(function(chord, index) {
    var logs = [];
    chord.forEach(function(frequency) {
      var sineosc = context.createOscillator()
      , startTime = currentTime + (index * duration);
      sineosc.type = 'sine';
      sineosc.frequency.value = frequency;
      sineosc.connect(context.destination);
      sineosc.start(startTime);
      sineosc.stop(startTime + duration);
      sineosc.onended = function(){
        logs.push('Finished ' + frequency.toFixed(2) + 'Hz tone.');
        if(logs.length > 2) {
          log(logs.join('\n'));
          log('---');
        }
      };
    });
  });

  log('Playing chord scale...');
}

function octaves() {
  var   context = getAudioContext()
  , frequencies = [220, 440, 880]
  , currentTime = audioContext.currentTime
  ,    duration = 1;


  frequencies.forEach(function(frequency, index) {
    var sineosc = context.createOscillator()
    , startTime = currentTime + (index * duration);
    sineosc.type = 'sine';
    sineosc.frequency.value = frequency;
    sineosc.connect(context.destination);
    sineosc.start(startTime);
    sineosc.stop(startTime + duration);
    sineosc.onended = function(){
      log('Finished ' + frequency + 'Hz tone.');
      if(index == frequencies.length - 1)
        log('---');
    };
  });

  log('Playing octaves: ' + frequencies);
}

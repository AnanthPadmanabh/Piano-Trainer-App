var oscillator = new Tone.Oscillator({
                                     "frequency" : 440,
                                     "volume" : -10
                                     })

oscillator.connect(Tone.Master);

var piano = new Tone.Sampler({
                           "C3" : "https://rawgit.com/zenpho/tjs/master/animalSounds/moose.mp3"
                           });

piano.connect(Tone.Master);

//var slide = document.getElementById('freq1');
//slide.addEventListener("input", slideChange);
//
//function slideChange(event) {
//    oscillator.frequency.value = this.value;
//}

//blue
var sqr = document.getElementById('blueSquare');
sqr.addEventListener("mousedown",randButtons)
sqr.addEventListener("mouseup",randButtons);

var keyboard = new Nexus.Piano("#pianokeys",{
                            'size': [672,225],
                            lowNote: 60,
                            highNote: 84
                            });

function randButtons(event) {
    
    if(event.type == 'mousedown')
    {
        var randNote = Math.floor(Math.random() * 24 + 60);
        var randFreq = Nexus.mtof(randNote);
        
        console.log("random note " + randNote);
        
        oscillator.frequency.value = randFreq;
        oscillator.start();
    }
    else
    {
        oscillator.stop();
    }
}


keyboard.on('change', function(keydata) {
    
    if (keydata.state) { // note pressed
        var note = keydata.note;
        
        var frequency = Nexus.mtof(note);
         
        console.log("pressed note " + note);
        
            piano.triggerAttack("D3")
            
//        oscillator.frequency.value = frequency;
//        oscillator.start();
    }
    else { // note released
            
            piano.triggerAttack("D3")
            
//        oscillator.stop();
    }
         });



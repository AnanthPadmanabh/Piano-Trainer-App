var oscillator = new Tone.Oscillator({
                                     "frequency" : 440,
                                     "volume" : -10
                                     })

oscillator.connect(Tone.Master);

var piano = new Tone.Sampler({
                           "C4" : "https://rawgit.com/AnanthPadmanabh/Piano-Trainer-App/master/Audio/C4.mp3",
                           "F#4" : "https://rawgit.com/AnanthPadmanabh/Piano-Trainer-App/master/Audio/F%234.mp3",
                           "C5" : "https://rawgit.com/AnanthPadmanabh/Piano-Trainer-App/master/Audio/C5.mp3",
                           "F#5" : "https://rawgit.com/AnanthPadmanabh/Piano-Trainer-App/master/Audio/F%235.mp3"
                           });

piano.connect(Tone.Master);

//blue
var sqr = document.getElementById('blueSquare');

sqr.innerHTML = "Press Me";

sqr.addEventListener("mousedown",randButtons)
sqr.addEventListener("mouseup",randButtons);

var keyboard = new Nexus.Piano("#pianokeys",{
                            'size': [672,225],
                            lowNote: 60,
                            highNote: 72
                            });

// Map keys to corresponding note names
var noteMap = {};
var noteNumberMap = [];
var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];


for(var i = 60; i < 84; i++) {
    
    key = notes[i % 12];
    octave = ((i / 12) | 0) - 1; // MIDI octave
    
    key += octave;
    
    noteMap[key] = i;
    noteNumberMap[i] = key;
    
}

function randButtons(event) {
    
    if(event.type == 'mousedown')
    {
        var randNote = Math.floor(Math.random() * 12 + 60);
        var randNoteName = noteNumberMap[randNote];
        
        console.log("Random note name " + randNoteName);
        
        piano.triggerAttack(randNoteName);
        
    }
    else
    {
        piano.triggerRelease(randNoteName);
        sqr.innerHTML = "Guess Me";
    }
}

keyboard.on('change', function(keydata) {
            
    
    if (keydata.state) { // note pressed
            
        var note = keydata.note;
        
        var noteName = noteNumberMap[note];
         
        console.log("Current Note name " + noteName);
        
            piano.triggerAttack(noteName);
            
    }
    else { // note released
            
           piano.triggerRelease(noteName);
        
    }
            
            sqr.innerHTML = "Press Me";
         });



/**
* Created by joe on 7/5/17.
*/
// Let's define our first command. First the text we expect, and then the function it should call
annyang.start({paused:false});

var tts = function (text) {
    responsiveVoice.speak(text, "US English Female");
};

vat hello = function() {
    tts("Hello Joe and Justin");
};

var wolframCmd = function (text) {
    console.log(text);
    $.getJSON("http://api.wolframalpha.com/v2/query?input="+text+"&appid=2U84K3-KP4588JAUQ",function(json) {
        console.log(json);
    });
};

var commands = {
    'hello':hello
};

var voiceName = 'Rosie';

var commands2 = {};
for(var v in commands){
    var cmd = voiceName + " " + v;
    var cmd2 = v + " " + voiceName;
    commands2[cmd]=commands[v];
    commands2[cmd2]=commands[v];
}

// Add our commands to annyang
annyang.addCommands(commands2);

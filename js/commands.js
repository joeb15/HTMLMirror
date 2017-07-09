/**
* Created by joe on 7/5/17.
*/
// Let's define our first command. First the text we expect, and then the function it should call
annyang.start({paused:false});

var tts = function (text) {
    responsiveVoice.speak(text, "US English Female");
}

var greeting = function() {
    tts("Hello Joe!")
}

var sayDate = function () {
    tts("Today is " + new Date().toDateString()+" .");
}

var sayTime = function () {
    var d = new Date();
    var h = d.getHours();
    if(h>12)
        h-=12;
    var m = d.getMinutes();
    if(m<10)
        m = "oh "+m;
    tts("It is currently " + h + " " + m)
}

var weHateMom = function () {
    tts("Yes... We do hate mom!")
}

var welcome = function () {
    tts("You are welcome!");
}

var currTemp = function () {
    var temp = document.getElementById("CurrTemp").innerHTML;
    tts(temp+" Fahrenheit");
}

var sunset = function () {
    var time = document.getElementById("Sunset").innerHTML;
    tts("Sunset is at " + time);
}

var sunrise = function () {
    var time = document.getElementById("Sunrise").innerHTML;
    tts("Sunrise is at " + time);
}

var commands = {
    'hello':greeting,
    'hi':greeting,
    'howdy':greeting,
    'hey':greeting,
    'what time is it': sayTime,
    'what\'s the date': sayDate,
    'do we hate mom':weHateMom,
    'thanks':welcome,
    'what\'s the temperature':currTemp,
    'when is sunset':sunset,
    'what time is sunset':sunset,
    'when is sunrise':sunrise,
    'what time is sunrise':sunrise,
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

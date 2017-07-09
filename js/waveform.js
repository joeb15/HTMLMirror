/**
 * Created by joe on 7/3/17.
 */

var waveformCanvas = document.getElementById("Waveform");
waveformCanvas.width=720;
waveformCanvas.height=1280;
var waveformContext = waveformCanvas.getContext("2d");
var width = 720;
var height = 1280;
var noise = new ClassicalNoise(Math);
var shouldClear=20;

function renderWaveform() {
    var num = 255-27*shouldClear;
    if(num<0)
        num=0;
    var rgb = "rgb("+num+","+num+","+num+")";
    waveformContext.strokeStyle=rgb;

    var waveformWidth = 300;
    var waveformSegs = 120;
    var waveformSegWidth = waveformWidth / waveformSegs;
    var maxHeight = 50;
    waveformContext.clearRect(0, 0, width, height);
    waveformContext.lineWidth = 5;

    waveformContext.beginPath();
    if (!responsiveVoice.isPlaying()) {
        waveformContext.lineTo(width / 2 - waveformWidth / 2, height / 2-maxHeight/2);
        waveformContext.lineTo(width / 2 + waveformWidth / 2, height / 2-maxHeight/2);
        shouldClear++;
    } else {
        shouldClear=0;
        for (var x = width / 2 - waveformWidth / 2; x <= width / 2 + waveformWidth / 2; x += waveformSegWidth) {
            waveformContext.lineTo(x, func(x, maxHeight) % 100 + height / 2 - maxHeight / 2);
        }
    }
    waveformContext.stroke();
}

function func(x, maxHeight) {
    var ms = new Date().getTime();
    return noise.noise(x/100, ms/200,0)*maxHeight;
}

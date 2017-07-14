/**
 * Created by joe on 7/14/17.
 */


var canvas = document.getElementById("Graph");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var ctx = canvas.getContext('2d');

var sunset = new Image();
sunset.src="temperatureGraph.png";
sunset.onload = function () {
    ctx.drawImage(sunset, 0, 0, window.innerWidth, window.innerWidth/2);
}


setTimeout(function () {
    location.reload();
}, 10000);

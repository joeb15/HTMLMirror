/**
 * Created by joe on 7/14/17.
 */
function updateImage(){
    var canvas = document.getElementById("Graph");

    canvas.width=window.width;
    canvas.height=window.width/2;
    var ctx = canvas.getContext('2d');

    var sunset = new Image();
    sunset.src="temperatureGraph.png";
    sunset.onload = function () {
        ctx.drawImage(sunset, 0, 0, window.width, window.width/2);
    }
}
updateImage();
setInterval(updateImage, 30000);

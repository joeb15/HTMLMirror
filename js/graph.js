/**
 * Created by joe on 7/14/17.
 */
function updateImage(){
    var canvas = document.getElementById("Graph");
    canvas.width=720;
    canvas.height=1280;
    var ctx = canvas.getContext('2d');

    var sunset = new Image();
    sunset.src="temperatureGraph.png";
    sunset.onload = function () {
        ctx.drawImage(sunset, 0, 0, 720, 360);
    }
}
updateImage();
setInterval(updateImage, 30000);

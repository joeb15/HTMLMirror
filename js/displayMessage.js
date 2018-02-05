var color;

function showMessage(){
    color = 255*2;
    document.getElementById("Display Message").style.display="block";
    document.getElementById("Display Message").style.webkitTextFillColor = getColor(color);
}

function clearMessage() {
    color--;
    document.getElementById("Display Message").style.webkitTextFillColor = getColor(color);
}

function getColor(col){
    if(col<0)
        col=0;
    if(col>255)
        col=255;
    return "rgb("+col+","+col+","+col+")";
}

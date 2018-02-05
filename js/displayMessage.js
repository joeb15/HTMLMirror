var color;

function showMessage(){
    color = 255;
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
    return "rgb("+col+","+col+","+col+")";
}

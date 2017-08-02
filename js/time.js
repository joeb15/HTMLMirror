/**
 * Created by joe on 6/27/17.
 */

function updateDate(){
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dateString = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate();
    document.getElementById("TimeDate").innerHTML=dateString;
}

function updateTime(){
    var d = new Date();
    var hours = d.getHours();
    var ampm = hours<12?"AM":"PM";
    var hours = hours % 12;
    if(hours==0)
        hours=12;
    if(hours<10)
        hours="0"+hours;
    var mins = d.getMinutes();
    if(mins<10)
        mins = "0"+mins;
    var seconds = d.getSeconds();
    if(seconds<10)
        seconds="0"+seconds;
    var timeString = hours+":"+mins;
    document.getElementById("TimeTimeSeconds").innerHTML=seconds;
    document.getElementById("TimeTimeAMPM").innerHTML=ampm;
    document.getElementById("TimeTime").innerHTML=timeString;
}

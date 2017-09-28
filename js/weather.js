/**
 * Created by joe on 6/24/17.
 */

var currLoc = "San Luis Obispo";
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function updateWeather(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+self.currLoc+"&units=imperial&APPID=07ba01a63aa8ffa15eccc5142a1c676b",function(json){
        var desc = json.weather[0].description;
        var temp = Math.round(json.main.temp);
        // var highTemp = Math.round(json.main.temp_max);
        // var lowTemp = Math.round(json.main.temp_min);
        document.getElementById("CurrTemp").innerHTML=temp+"&deg;";
        updateSunset(new Date(json.sys.sunset*1000));
        updateSunrise(new Date(json.sys.sunrise * 1000));
        // drawWindIcon();
        // console.log(sunrise.getHours()+":"+sunrise.getMinutes());
        // console.log(sunset.getHours()+":"+sunset.getMinutes());
        var canvas = document.getElementById("CurrWeatherIcon");
        canvas.width=85;
        canvas.height=85;
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "img/"+json.weather[0].icon+"_bw.png";
        img.src = img.src.replace("n_", "d_");
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 85, 85);
        }
        // var windSpeed = json.wind.speed;
    });
    var numDays=5;
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+self.currLoc+"&units=imperial&cnt="+numDays+"&APPID=07ba01a63aa8ffa15eccc5142a1c676b",function(json) {
        var forecast = [];
        for(var i=0;i<json.list.length;i++){
            var date = new Date(json.list[i].dt*1000);
            var highTemp = Math.round(json.list[i].temp.max);
            var lowTemp = Math.round(json.list[i].temp.min);
            var day = days[date.getDay()];
            var icon = json.list[i].weather[0].icon;
            var imgsrc = "img/"+icon+"_bw.png";
            imgsrc = imgsrc.replace("n_","d_");
            forecast.push({
                src:imgsrc,
                hi:highTemp,
                lo:lowTemp,
                day:day
            });
        }
        updateForecast(forecast);
    });
}

function drawWindIcon(){
    var canvas = document.getElementById("WindIcon");
    canvas.width=50;
    canvas.height=50;
    var ctx = canvas.getContext('2d');
    var sunset = new Image();
    sunset.src="img/wind.png";
    sunset.onload = function () {
        ctx.drawImage(sunset,0,10,50,30);
    }
}

function updateSunset(sunsetDate){
    var h = sunsetDate.getHours();
    if(h>12)
        h-=12;
    var m = sunsetDate.getMinutes();
    var min = m;
    if(min<10)
        min="0"+min;
    document.getElementById("SunsetTime").innerHTML=(h+":"+min).trim();
    var canvas = document.getElementById("SunsetIcon");
    canvas.width=50;
    canvas.height=50;
    var ctx = canvas.getContext('2d');
    var sunset = new Image();
    sunset.src="img/sunset.png";
    sunset.onload = function () {
        ctx.drawImage(sunset,0,0,50,50);
    }
    if(m<10)
        m = "oh "+m;
    var sunsetTime = h + " " + m;
    document.getElementById("Sunset").innerHTML=sunsetTime;
}

function updateSunrise(sunriseDate){
    var h = sunriseDate.getHours();
    if(h>12)
        h-=12;
    var m = sunriseDate.getMinutes();
    if(m<10)
        m = "oh "+m;
    var sunriseTime = h + " " + m;
    document.getElementById("Sunrise").innerHTML=sunriseTime;
}

function updateForecast(days){
    var eList = document.getElementById("Forecast");
    var eList2 = document.createElement("table");
    eList2.innerHTML="";
    addForecast(days, eList2, 0);
    eList.innerHTML = eList2.innerHTML;
}

function addChild(div, part){
    var td = document.createElement("td");
    td.appendChild(part);
    div.appendChild(td);
}

function addForecast(days, eList, index){
    var curr = days[index];
    var textContent = document.createElement("p");
    textContent.innerHTML=curr.day;
    var canvas = document.createElement("canvas");
    var hilo = document.createElement("p");
    hilo.innerHTML = curr.lo +"-"+curr.hi+"&deg;";
    var image = new Image();
    image.src=curr.src;
    var div = document.createElement("tr");
    image.onload=function () {
        canvas.width=35;
        canvas.height=35;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image,0, 0, 35, 35);

        addChild(div, hilo);
        addChild(div, canvas);
        addChild(div, textContent);

        eList.appendChild(div);
        if(index+1<days.length) {
            addForecast(days, eList, index + 1);
        }
    }
}

function toFahrenheit(kelvin) {
    var tempCelsius = kelvin - 273.15;
    var tempFahrenheit = tempCelsius * 9 / 5 + 32;
    return Math.round(tempFahrenheit)
}

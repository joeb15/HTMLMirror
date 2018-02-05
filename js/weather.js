/**
 * Created by joe on 6/24/17.
 */

var currLoc = "q=San Luis Obispo";
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function updateWeather(){
    var numDays=5;
    $.getJSON("http://api.apixu.com/v1/forecast.json?days="+numDays+"&key=27786c582533482bb5b185648172809&"+self.currLoc,function(json){
        var temp = Math.round(json.current.temp_f);
        document.getElementById("CurrTemp").innerHTML=temp+"&deg;";

        //updateSunset(new Date(json.sys.sunset*1000));
        //updateSunrise(new Date(json.sys.sunrise * 1000));

        var canvas = document.getElementById("CurrWeatherIcon");
        canvas.width=85;
        canvas.height=85;
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = json.current.condition.icon;

        img.onload = function () {
            ctx.drawImage(img, 0, 0, 85, 85);
        }

        var forecast = [];
        for(var i=0;i<numDays;i++){
            var day = json.forecast.forecastday[i];
            var date = new Date(day.date_epoch*1000);
            var highTemp = Math.round(day.day.maxtemp_f);
            var lowTemp = Math.round(day.day.mintemp_f);
            if(i===0){
                if(temp>highTemp)
                    highTemp=temp;
                if(temp<lowTemp)
                    lowTemp=temp;
            }
            var icon = day.day.condition.icon;
            var day = days[date.getDay()];
            forecast.push({
                src:icon,
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
    textContent.innerHTML="<strong>"+curr.day+"</strong>";
    var canvas = document.createElement("canvas");
    canvas.width=25;
    canvas.height=25;
    canvas.id="Canvas"+index;
    var hilo = document.createElement("p");
    hilo.innerHTML = "<strong>"+curr.lo +"-"+curr.hi+"&deg;</strong>";
    var image = new Image();
    image.src=curr.src;
    var div = document.createElement("tr");
    div.style.verticalAlign="top";
    addChild(div, hilo);
    addChild(div, canvas);
    addChild(div, textContent);

    image.onload=function () {
        var canvas = document.getElementById("Canvas"+index);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image,0, 0, 25, 25);
    };
    eList.appendChild(div);
    if(index+1<days.length) {
        addForecast(days, eList, index + 1);
    }
}

function toFahrenheit(kelvin) {
    var tempCelsius = kelvin - 273.15;
    var tempFahrenheit = tempCelsius * 9 / 5 + 32;
    return Math.round(tempFahrenheit)
}

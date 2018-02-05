
/*
    UPDATE ALL VALUES ON PAGE LOAD
 */

updateTime();
updateDate();
updateWeather();
showMessage();

/*
    UPDATE ALL VALUES AT SPECIFIC INTERVALS
 */

setInterval(clearMessage,         10*1000);
setInterval(updateTime,         .5*1000);           //Update the time every 1/2 second
setInterval(updateDate,         60*1000);         //Update the day every 60 seconds
setInterval(listUpcomingEvents, 60*1000);         //Update the event list every 60 seconds
setInterval(updateWeather,      20*60*1000);         //Update the weather every hour
//setInterval(renderWaveform,     125);

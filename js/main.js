
/*
    UPDATE ALL VALUES ON PAGE LOAD
 */

updateTime();
updateDate();
updateWeather();

/*
    UPDATE ALL VALUES AT SPECIFIC INTERVALS
 */

setInterval(updateTime,         500);           //Update the time every 1/2 second
setInterval(updateDate,         60000);         //Update the day every 60 seconds
setInterval(listUpcomingEvents, 60000);         //Update the event list every 60 seconds
setInterval(updateWeather,      60000);         //Update the weather every 60 seconds
setInterval(renderWaveform,     125);

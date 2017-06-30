/**
 * Created by joe on 6/24/17.
 */

var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


function onEventListUpdated(events) {
    updateEventSummaries(events);
    updateEventTimes(events);
}

function updateEventSummaries(events){
    var processed = [];
    var eList = document.getElementById("EventsSummary");
    eList.innerHTML="";
    if(events.length>0){
        for (i = 0; i < events.length && processed.length<5; i++) {
            var event = events[i];
            if(processed.indexOf(event.summary)==-1){
                var message = event.summary;
                var textContent = document.createTextNode(message + '\n');
                eList.appendChild(textContent);
                processed.push(event.summary);
            }
        }
    }
}

function updateEventTimes(events){
    var processed = [];
    var eList = document.getElementById("EventsTime");
    var children = eList.childNodes;
    eList.innerHTML="";
    if(events.length>0){
        for (i = 0; i < events.length && processed.length<5; i++) {
            var event = events[i];
            if(processed.indexOf(event.summary)==-1){
                var month = (event.date.getMonth());
                month = months[month];
                var day = (event.date.getDate()+1);
                var message = month+" "+day;
                var hr = event.date.getHours()%12+1;
                var ampm = event.date.getHours()/12;
                if(ampm<1)
                    ampm="am";
                else
                    ampm="pm";
                message = message+ " @ "+hr + " " + ampm;
                var textContent = document.createTextNode(message + '\n');
                eList.appendChild(textContent);
                processed.push(event.summary);
            }
        }
    }
}

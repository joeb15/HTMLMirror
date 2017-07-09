/**
 * Created by joe on 6/24/17.
 */

var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


function onEventListUpdated(events) {
    updateEventTimes(events);
    updateEventSummaries(events);
}

function updateEventSummaries(events){
    var processed = [];
    var eList = document.getElementById("Events");
    var textContent = document.createElement("td");
    textContent.setAttribute("id","EventSummary");
    if(events.length>0){
        for (i = 0; i < events.length && processed.length<5; i++) {
            var event = events[i];
            if(processed.indexOf(event.summary)==-1 && event.summary.indexOf("High")==-1){
                var message = event.summary;
                var p = document.createElement("p");
                p.innerHTML=message;
                add(textContent, p);
                processed.push(event.summary);
            }
        }
    }
    eList.appendChild(textContent);
}

function add(td, p){
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var td2 = document.createElement("td");
    td2.appendChild(p);
    tr.appendChild(td2);
    table.appendChild(tr);
    td.appendChild(table);
}

function updateEventTimes(events){
    var processed = [];
    var eList = document.getElementById("Events");
    eList.innerHTML="";
    var textContent = document.createElement("td");
    if(events.length>0){
        for (i = 0; i < events.length && processed.length<5; i++) {
            var event = events[i];
            if(processed.indexOf(event.summary)==-1 && event.summary.indexOf("High")==-1){
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
                var p = document.createElement("p");
                p.innerHTML=message;
                add(textContent, p);
                processed.push(event.summary);
            }
        }
    }
    eList.appendChild(textContent);
}

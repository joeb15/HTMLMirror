var CLIENT_ID = '661305931972-ov85fkkhpvutmkibkei6qgbp7okfoh05.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');

var events = [];
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function listUpcomingEvents() {
    self.events=[];
    addCalendars([
        'primary',
        'en.usa#holiday@group.v.calendar.google.com',
        '#contacts@group.v.calendar.google.com',
        '93694c2fjlu127r1n8kokia0i0@group.calendar.google.com',
        '2uavfqbsdod38j8vt4lhogtlao@group.calendar.google.com'],
        doneLoading
    );
}

function doneLoading(){
    self.events.sort(function(a, b) {
        return a.time - b.time;
    });
    onEventListUpdated(self.events);
}

function addCalendars(calendarIDs, cb) {
    if(calendarIDs.length>0){
        gapi.client.calendar.events.list({
            'calendarId': calendarIDs.shift(),
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response){
            for(var i=0;i<response.result.items.length;i++){
                var event = response.result.items[i];
                var when = event.start.date;
                if(!when){
                    when = event.start.dateTime;
                }
                var d = new Date(when);
                var timeDiff = Math.abs(new Date().getTime() - d.getTime());
                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
                self.events.push({summary:event.summary,time:diffDays,date:d});
            }
            addCalendars(calendarIDs, cb)
        });
    }else{
        cb();
    }
}

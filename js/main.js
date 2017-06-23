d = new Date();
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
dateString = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();

document.write(dateString);

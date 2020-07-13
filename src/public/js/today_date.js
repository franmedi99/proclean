var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = day + "/" + month + "/" + year;
var mes =  month + "/" + year;
document.getElementById("theDate").value = today;
document.getElementById("theDate1").value = today;
document.getElementById("month").value = month;
document.getElementById("year").value = year;
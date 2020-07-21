   var today = new Date();

   var hr = today.getHours();
   var min = today.getMinutes();
   //Add a zero in front of numbers<10
   min = checkTime(min);
   var tiempo = hr + ":" + min;
   document.getElementById("thetime1").value = tiempo;
   document.getElementById("thetime").value = tiempo;

   function checkTime(i) {
       if (i < 10) {
           i = "0" + i;
       }
       return i;
   }
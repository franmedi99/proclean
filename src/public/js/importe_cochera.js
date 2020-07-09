function abc(mhora,hora) {
    var mhora = document.getElementById('mhora');
    var ipmh = document.getElementById("ipmh");
    ipmh.style.display = mhora.checked ? "block" : "none";


    var hora = document.getElementById('hora');
    var iph = document.getElementById('iph');
    iph.style.display = hora.checked ? "block" : "none";


    


}

function hora(){
    var hora = document.getElementById('hora');


    var iphora = document.getElementById('iphora');
    console.log(iphora.value);


    var hora_total = hora.value * iphora.value;

    document.getElementById("final").value = parseInt(hora_total);

}

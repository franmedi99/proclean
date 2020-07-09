function abc(mhora,hora) {

    //media hora
    var mhora = document.getElementById('mhora');
    var ipmh = document.getElementById("ipmh");
    ipmh.style.display = mhora.checked ? "block" : "none";

    //hora
    var hora = document.getElementById('hora');
    var iph = document.getElementById('iph');
    iph.style.display = hora.checked ? "block" : "none";

    //medio dia
    var mdia = document.getElementById('mdia');
    var ipmd = document.getElementById('ipmd');
    ipmd.style.display = mdia.checked ? "block" : "none";

    //dia
    var dia = document.getElementById('dia');
    var ipd = document.getElementById('ipd');
    ipd.style.display = dia.checked ? "block" : "none";

    //semana
    var semana = document.getElementById('semana');
    var ips = document.getElementById('ips');
    ips.style.display = semana.checked ? "block" : "none";

    //quincena
    var quincena = document.getElementById('quincena');
    var ipq = document.getElementById('ipq');
    ipq.style.display = quincena.checked ? "block" : "none";

    //mes
    var mes = document.getElementById('mes');
    var ipm = document.getElementById('ipm');
    ipm.style.display = mes.checked ? "block" : "none";


    //Importe

    //all imports

    var ipmhora = document.getElementById('ipmhora');
    var mhora_total = mhora.value  * ipmhora.value;
    

    
    var iphora = document.getElementById('iphora');
    var hora_total = hora.value * iphora.value;
    

    var ipmdia = document.getElementById('ipmdia');
    var mdia_total = mdia.value * ipmdia.value;
    

    var ipdia = document.getElementById('ipdia');
    var dia_total = dia.value * ipdia.value;
    

    var ipsemana = document.getElementById('ipsemana');
    var semana_total = semana.value * ipsemana.value;
    

    var ipquincena = document.getElementById('ipquincena');
    var quincena_total = quincena.value * ipquincena.value;
    

    var ipmes = document.getElementById('ipmes');
    var mes_total = mes.value * ipmes.value;
    

    //total
    document.getElementById("final").value = parseInt(mhora_total) + parseInt(hora_total) + parseInt(mdia_total) + parseInt(dia_total) + parseInt(semana_total) + parseInt(quincena_total) + parseInt(mes_total);
}

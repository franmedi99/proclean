function abc(valor_lustre, valor_motor, valor_extra) {
    //lustre
    var lustre = document.getElementById("lustre");
    var ipl = document.getElementById('ipl');
    ipl.style.display = lustre.checked ? "block" : "none";
    if(lustre.checked){
        var valor_lustre = document.getElementById('iplustre').value * lustre.value;
    }else{
        var valor_lustre = 0;
        document.getElementById('iplustre').value = 0;
    }
    
   
    //motor
    var motor = document.getElementById('motor');
    if(motor.checked){
        var valor_motor = motor.value;
    }else{
        var valor_motor = 0;
    }


    //lavado
    var lavado = document.getElementById('lavado');
    if(lavado.checked){
        var valor_lavado = lavado.value
    }else{
        var valor_lavado = 0
    }

    //tapizado
    var tapizado = document.getElementById('tapizado');
    if(tapizado.checked){
        var valor_tapizado = tapizado.value
    }else{
        var valor_tapizado = 0
    }

    //barro
    var barro = document.getElementById('barro');
    var ipb = document.getElementById('ipb');
    ipb.style.display = barro.checked ? "block" : "none";
    if(barro.checked){
        var valor_barro = document.getElementById('ipbarro').value * barro.value;
    }else{
        var valor_barro = 0
        document.getElementById('ipbarro').value = 0;
        
    }

     //cuero
     var cuero = document.getElementById('cuero');
     if(cuero.checked){
         var valor_cuero = cuero.value
     }else{
         var valor_cuero = 0
     }

    //acrilico
    var acrilico = document.getElementById('acrilico');
    if(acrilico.checked){
        var valor_acrilico = acrilico.value
    }else{
        var valor_acrilico = 0
    }



    document.getElementById("final").value = parseInt(valor_lustre) + parseInt(valor_motor) + parseInt(valor_lavado) + parseInt(valor_tapizado)
    +parseInt(valor_barro) + parseInt(valor_cuero) + parseInt(valor_acrilico);
    document.getElementById("total").value = parseInt(valor_lustre) + parseInt(valor_motor) + parseInt(valor_lavado) + parseInt(valor_tapizado)
    +parseInt(valor_barro) + parseInt(valor_cuero) + parseInt(valor_acrilico);
}



    
    


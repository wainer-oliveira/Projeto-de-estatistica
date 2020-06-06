let btn = document.getElementById('botao')

//Acionado por clique do Botão
btn.onclick = function pega_elementos(){

    let tabela = document.getElementById("tipo").value
    //Captura dos elementos do input
    let elementsInput = document.getElementById("elementos")
    const elementos = elementsInput.value.split(" ")
    
    //Reconhecendo qual tipo de tabela
    switch(tabela){
        case 'quali_nom' :
            Qualitativa_Nominal(elementos)
            break;
        
        case 'quali_ord' :
            Qualitativa_Ordinal(elementos)
            break;
        
        case 'quant_cont' :
            Quantitativa_Continua(elementos)
            break;
        
        case 'quant_disc' :
            Quantitativa_Discreta(elementos)
            break;
    }
    
}


function Qualitativa_Nominal(vetor){
    alert('qualitativa Nominal teste')
}

function Qualitativa_Ordinal(vetor){
    alert("Qualitativa Ordinal teste")
}

function Quantitativa_Continua(vetor){
    alert('Quantitativa Continua teste')
}

function Quantitativa_Discreta(vetor){
    alert('quantitativa Discreta teste')
}



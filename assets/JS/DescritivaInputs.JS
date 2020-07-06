function MudarInputRange(){
    let inputselectseparatriz = document.getElementById("SelectMedidaSeparatriz")
    let medidaseparatriz = inputselectseparatriz.value
    let inputrange = document.getElementById("valorseparatriz")
    inputrange.value = 0

    if(medidaseparatriz == "porcentil"){
        inputrange.setAttribute("min","1")
        inputrange.setAttribute("max","100")
        inputrange.setAttribute("step","1")

    }else if(medidaseparatriz == "quartil"){
        inputrange.setAttribute("min","25")
        inputrange.setAttribute("max","100")
        inputrange.setAttribute("step","25")

    }else if(medidaseparatriz == "quintil"){
        inputrange.setAttribute("min","20")
        inputrange.setAttribute("max","100")
        inputrange.setAttribute("step","20")

    }else if(medidaseparatriz == "decil"){
        inputrange.setAttribute("min","10")
        inputrange.setAttribute("max","100")
        inputrange.setAttribute("step","10")

    }else{
        inputrange.setAttribute("min","0")
        inputrange.setAttribute("max","0")
    }
    MostrarInputRange()
}

function MostrarInputRange(){
    if((document.getElementById("SelectMedidaSeparatriz").value) != "inativo"){
        let inputrange = document.getElementById("valorseparatriz")    
        let prange = document.getElementById("valorinputrange")
        prange.innerHTML = ''
        prange.innerHTML = `${inputrange.value}%`
    }
}

let btngerar = document.getElementById("btn-gerar")

btngerar.onclick = function CapturarElementos(){
    let inputnome = document.getElementById("InputNomeVariavel")
    let nome
    if(inputnome.value == ""){
        nome = "Sem nome"
    }else{
        nome = inputnome.value
    }

    let tipotabela = document.getElementById("TipoTabela").value
    let elementos
    if(tipotabela == "qualitativanominal"){
        elementos = TratarInputQualitativaNominal()
        CalcularQualitativaNominal(nome, elementos)
        console.log(elementos)              
    }else if(tipotabela == "qualitativaordinal"){
        elementos = TratarInputQualitativaOrdinal()
        console.log(elementos)
    }else if(tipotabela == "quantitativadiscreta"){

    }else if (tipotabela == "quantitativacontinua"){

    }else{
        alert("Selecione o tipo de tabela para podermos continuar!")
    }
    

}

function TratarInputQualitativaNominal(){
    let inputelementos = document.getElementById("InputDadosVariavel")
    let elementos =[]
    if(inputelementos.value == ""){
        alert("Insira os elementos para que possamos continuar!")
    }else{
        elementos = (inputelementos.value).split(" ")
        elementos = elementos.sort()
    }
    elementos = elementos.filter(a => a != "")
    return elementos
}

function TratarInputQualitativaOrdinal(){

}
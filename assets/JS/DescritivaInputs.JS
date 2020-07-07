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

    let separatriz = []
    separatriz.push(document.querySelector('input[name="TipoDados"]:checked').value);
    if(separatriz[0] == "populacao"){
        separatriz[0] = 0
    }else{
        separatriz[0] = 1
    }
    separatriz.push(document.getElementById("SelectMedidaSeparatriz").value)
    if(separatriz[1]!= "inativo"){
        separatriz.push(Number(document.getElementById("valorseparatriz").value))
        separatriz.push(separatriz[2] / (Number(document.getElementById("valorseparatriz").step)))
        separatriz[2] = separatriz[2] / 100   
    }

    let tipotabela = document.getElementById("TipoTabela").value
    let elementos
    if(tipotabela == "qualitativanominal"){
        let array = TratarInputString()
        elementos = array.sort()
        CalcularQualitativa(nome, elementos, separatriz)

    }else if(tipotabela == "qualitativaordinal"){
        elementos = TratarInputString()
        CalcularQualitativa(nome,elementos,separatriz)

    }else if(tipotabela == "quantitativadiscreta"){
        elementos = TratarInputNumber()
        CalcularQuantitativaDiscreta(nome, elementos,separatriz)

    }else if (tipotabela == "quantitativacontinua"){
        elementos = TratarInputNumber()
        CalcularQuantitativaContinua(nome,elementos,separatriz)

    }else{
        alert("Selecione o tipo de tabela para podermos continuar!")
    }
}

function zerar(local){
    local.value = ""
}

function TratarInputString(){
    let inputelementos = document.getElementById("InputDadosVariavel")
    let elementos =[]
    if(inputelementos.value == ""){
        alert("Insira os elementos para que possamos continuar!")
    }else{
        elementos = (inputelementos.value).split(",")
    }
    elementos = elementos.filter(a => a != "")
    return elementos
}

function TratarInputNumber(){
    let inputelementos = document.getElementById("InputDadosVariavel")
    let elementos = []
    if(inputelementos.value == ""){
        alert("Insira os elementos para que possamos continuar!")
    }else{
        elementos = (inputelementos.value).split(",")
    }
    elementos = elementos.filter(a => a != "")
    elementos = elementos.sort((a,b) => a - b)
    elementos = elementos.filter(a => Number(a) == a)
    if(elementos.length == 0){
        alert("DADOS INVÁLIDOS!")
    }else{
        elementos = elementos.map(a => Number(a))
        return elementos
    }
}

let InputFile = document.getElementById("uploadFile")
InputFile.addEventListener('change',() => {
    readXlsxFile(InputFile.files[0]).then((data) => {
        let nome = document.getElementById("InputNomeVariavel")
        let dados = document.getElementById("InputDadosVariavel")

        zerar(nome)
        zerar(dados)
        nome.value = data[0]
        
      for(let i = 1; i < data.length; i++){
        if(i == data.length-1){
            dados.value += `${data[i]}`
            break
        }
        dados.value += `${data[i]},`
      }
    })
})

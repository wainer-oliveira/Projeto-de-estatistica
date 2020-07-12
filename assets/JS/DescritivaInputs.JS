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
        elementos = TratarInputString(document.getElementById("InputDadosVariavel"))
        let array = [... new Set(elementos)]
        let ordem = array.sort()
        CalcularQualitativa(nome,ordem, elementos, separatriz)

    }else if(tipotabela == "qualitativaordinal"){
        elementos = TratarInputString(document.getElementById("InputDadosVariavel"))
        let ordem = setOrdem(elementos)
        CalcularQualitativa(nome,ordem ,elementos,separatriz)

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

function setOrdem(elementos){
    let data = document.getElementById("DivOrdemDados").children
    let arr = [].slice.call(data);
    let arrayOrdem = []
    arr.forEach(x => {
        arrayOrdem.push((x.children[1]).value)
    })

    return arrayOrdem
}

function zerar(local){
    local.value = ""
}

function TratarInputString(inputelementos){
    let elementos =[]
    if(inputelementos.value == ""){
        alert("Insira os elementos para que possamos continuar!")
    }else{
        elementos = (inputelementos.value).split(",")
        elementos = elementos.map(a => a.toLowerCase(a))
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

let choseTable = document.getElementById("TipoTabela")
choseTable.addEventListener('change',() => {
    data = document.getElementById("TipoTabela").value
    if(data == "qualitativaordinal"){
        document.getElementById('DivOrdemDados').innerHTML = ""
        let dados = [...new Set(TratarInputString(document.getElementById("InputDadosVariavel")))]
        
        for(let i = 1 ; i <= dados.length ; i++){

            let divMae =document.createElement("div")
            divMae.setAttribute("class", "input-group mb-2 mt-2")
            divMae.setAttribute("id", "divMaeId")

            let divOrdem =document.createElement("div")
            divOrdem.setAttribute("class", "input-group-prepend")

            let labelOrdem =document.createElement("label")
            labelOrdem.setAttribute("class", "input-group-text")
            labelOrdem.innerHTML = i+"°"

            let selectOrdem = document.createElement("select")
            selectOrdem.value = i
            selectOrdem.id = "select"+i
            selectOrdem.className = "custom-select"

            labelOrdem.setAttribute("for", "select"+i)

            document.getElementById("DivOrdemDados").appendChild(divMae)
            divMae.appendChild(divOrdem)
            divOrdem.appendChild(labelOrdem)
   
            dados.forEach(x => {
                let opcaoOrdem = document.createElement("option")
                opcaoOrdem.value = x
                opcaoOrdem.innerHTML = x
                selectOrdem.appendChild(opcaoOrdem)
            })

            divMae.appendChild(selectOrdem)
        }
        
        document.getElementById('DivOrdemDados').style.display = "block"

    } else {
        document.getElementById('DivOrdemDados').style.display = "none"
    }
    
})
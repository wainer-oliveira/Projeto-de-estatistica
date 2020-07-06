//Funções Auxiliares
function QuantidadeOcorrencia(elemento, array){
    let idx = array.indexOf(elemento)
    if(idx === -1) return 0
    let indices = []
    while(idx != -1){
        indices.push(idx)
        idx = array.indexOf(elemento, idx + 1)
    }
    return indices.length
}

//Funções de Frequencias
function CalcularFrequenciaAcumulada(frequenciasimples){
    let frequenciaacumulada = [0]
    frequenciasimples.forEach((a,b) => frequenciaacumulada.push(a + frequenciaacumulada[b]))
    frequenciaacumulada.splice(0,1)
    return frequenciaacumulada
}

function CalcularFrequenciaRelativa(frequenciasimples, frequenciaacumulada){
    let frequenciarelativa = frequenciasimples.map(a => (a / frequenciaacumulada[frequenciaacumulada.length -1]) * 100 )
    frequenciarelativa = frequenciarelativa.map(a => a.toFixed(2) + "%")
    return frequenciarelativa
}

function CalcularFacPorcentagem(fr){
    let facporcentagem = [0]
    fr.forEach((a,b) => facporcentagem.push(facporcentagem[b] + a))
    facporcentagem.splice(0,1)
    facporcentagem = facporcentagem.map(a => a + "%")
    return facporcentagem
}

//Funções Principais
function CalcularQualitativaNominal(nome, array){ 
    console.log("oi")
    let newArray = array.map(a => a.toLowerCase(a))
    let elementos = [... new Set(newArray)]
    let frequenciaSimples = elementos.map(a => QuantidadeOcorrencia(a, newArray))
    let frequenciaAcumulada = CalcularFrequenciaAcumulada(frequenciaSimples)
    let frequenciaRelativa = CalcularFrequenciaRelativa(frequenciaSimples, frequenciaAcumulada)
    let frequenciaAcumuladaPorcentagem = CalcularFacPorcentagem(frequenciaRelativa)
    let mediana = FuncaoMediana(elementos, frequenciaAcumulada)
    let moda = FuncaoModa(elementos, frequenciaSimples)

    let titulosTabelaPrincipal = [` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]
    let titulosTabelaSecundaria = ["Moda", "Mediana"]
    let dadostabelaprincipal = []
    frequenciaSimples.forEach((a,b) => dadostabelaprincipal.push(
    [`${elementos[b]}`, ${frequenciaSimples[b]}, ${frequenciaRelativa[b]}, ${frequenciaAcumulada[b]}, `${frequenciaAcumuladaPorcentagem[b]}]
    ))
    let dadostabelasecundaria = [mediana, moda]
    let novadiv = CriarDiv()
    let tabelaprincipal = CriarTabela(novadiv)
    let tabelasecundaria = CriarTabela(novadiv)
    GerarTableHead(tabelaprincipal, titulosTabelaPrincipal)
    GerarTable(tabelasecundaria, titulosTabelaSecundaria)

}


//FUNÇÕES DE MEDIDAS DE TENDÊNCIA CENTRAL
function FuncaoMedia(array, freqArray){
    let media = array.map((a,b) => a * freqArray[b])
    media = (media.reduce ((a,b) => a+b) ) / (freqArray.reduce((a,b) => a+b))
    media = media.toFixed(2)
    return media
}

function FuncaoModa(array, freqArray){
    let moda
    let maior = Math.max.apply(Math, freqArray)
    let vetorIndex = []

    freqArray.forEach((a,b) => {if(a == maior) vetorIndex.push(b) })

    if(vetorIndex.length == freqArray.length){
        moda = "Amodal"
    }else if(vetorIndex.length == 1){
        moda = array[vetorIndex]
    }else{
        moda =  vetorIndex.map(a => array[a])
    }
    
    return moda
}

function FuncaoMedianaContinua(array, freq, IntervaloClasse, freqacumulada){
    let posicao = freq.reduce((a,b) => a + b) / 2
    let mediana
    let auxiliar
    
    for(let i=0; i < freq.length; i++){
        if(freqacumulada[i] >= posicao ){
            i == 0 ? auxiliar = 0: auxiliar = freqacumulada[i-1]
            mediana = (array[i][0] + (((posicao - auxiliar) / freq[i]) * IntervaloClasse))
            return mediana.toFixed(2)
        }
    }
}

function FuncaoMediana(array, freqAcum){
    let acum = freqAcum[freqAcum.length - 1]
    let posicao
    let mediana

    if(acum % 2 == 0){
        posicao = []
        mediana = []
        posicao.push(acum / 2)
        posicao.push(posicao[0] + 1)
        for(let i = 0; i < freqAcum.length; i++){
            if(freqAcum[i] >= posicao[0]){
                 mediana[0] = array[i]
                  break
            }
        }
        for(let i = 0; i < freqAcum.length; i++){
            if(freqAcum[i] >= posicao[1]){
                 mediana.push(array[i])
                  break
            }
        }
        if(mediana[0] == mediana[1]) mediana = mediana[0] 
    }else{
        posicao = acum / 2
        for(let i = 0; i < freqAcum.length; i++){
            if(freqAcum[i] >= posicao){
                return mediana = array[i]
            }
        }
    }
    return mediana
}

//Funções de Tabela
function CriarDiv(){
    let divMostrarDados = document.getElementById("MostrarDados")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("class", "container")
    divMostrarDados.appendChild(newdiv)
    return newdiv
}

function CriarTabela(div){
    let tabela = document.createElement("table")
    div.appendChild(tabela)
    tabela.setAttribute("class", "table")
    return(tabela)
}

function GerarTableHead(table, data){
    let thead = table.createTHead()
    let linha = thead.insertRow()
    linha.setAttribute("class", "linhaHead")
    for (let key of data) {
        let th = document.createElement("th")
        let text = document.createTextNode(key)
        th.appendChild(text)
        linha.appendChild(th)
    }
}

function GerarTable(table, data) {
    let tabela = table
    for(element of data){
        let row = table.insertRow()
        row.setAttribute("class","linha")
        for( key in element){
            let cell = row.insertCell()
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
}
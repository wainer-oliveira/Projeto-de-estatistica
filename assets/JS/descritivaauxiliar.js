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

function FuncaoSeparatriz(array, freqAcum,valorseparatriz ){   
    let posicao = Math.round((freqAcum[freqAcum.length - 1]) * valorseparatriz)
    let resultado

    for(let i = 0; i < freqAcum.length; i++){
        if(freqAcum[i] >= posicao){
            resultado = array[i]
              break
        }
    }
    return resultado
}

function FuncaoDesvioPadrao(elementos, frequencia, media,tipoamostra){
    let DP = elementos.map((a,b) => ((a - media) ** 2) * frequencia[b])
    DP = DP.reduce((a,b) => a + b)
    DP = Math.sqrt(DP / ((frequencia.reduce((a,b) => a + b) - tipoamostra)))
    return DP.toFixed(2)
}

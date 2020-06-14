let btnGerar = document.getElementById('btnGerar')
const tabela_main = document.getElementById("tabelaPrincipal")

btnGerar.onclick = function pega_elementos(){
    //Captura dos elementos do input
    const nome = document.getElementById("nome")
    let tipo_tabela = document.getElementById("tipo").value
    let elementosInput = document.getElementById("elementos")
    const elementos = elementosInput.value.split(" ")
    
    //Reconhecendo qual tipo de tabela
    switch(tipo_tabela){
        case 'quali_nom' :
            Qualitativa_Nominal(elementos)
            break;
        
        case 'quali_ord' :
            Qualitativa_Ordinal(elementos)
            break;
        
        case 'quant_cont' :
            Quantitativa_Continua(elementos)
            break;
        
        case 'quant_dis' :
            Quantitativa_Discreta(elementos)
            break;
    } 
}

//FUNÇÕES AUXILIARES
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

function FuncaoMedianaContinua(array, freq, IntervaloClasse, freqacumulada){
    let posicao = freq.reduce((a,b) => a+b) / 2
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

//FUNÇÕES DE CALCULOS DE TABULAÇÃO
function Qualitativa_Nominal(array){ 
    let SortArray = array
    SortArray = SortArray.sort()
    let variavel = [... new Set(SortArray)]
    let freq = variavel.map(a => QuantidadeOcorrencia(a, SortArray))

    let freq_acum = [0]
    freq.forEach((a,b) => freq_acum.push(a + freq_acum[b]))
    freq_acum.splice(0,1)

    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    let moda = FuncaoModa(elementos, freq)
    let mediana = FuncaoMediana(elementos, freq_acum)

    let ArrayObjt = []
    variavel.forEach((a,b) => ArrayObjt.push({
         Variavel : `${a}`,
         Frequencia : `${freq[b]}`,
         Frequencia_Relativa : `${freq_rel_string[b]}`,
         freq_Percentual : `${freq_acum[b]}`,
         freq_Acumulada : `${freq_acum_por_string[b]}`
    }))

    GeradorTabela(tabela_main, ArrayObjt)
}

function Qualitativa_Ordinal(array){ 
    let newArray = array.map(a => a.toLowerCase(a))
    let variavel = [... new Set(newArray)]
    let freq = variavel.map(a => QuantidadeOcorrencia(a, newArray))

    let freq_acum = [0]
    freq.forEach((a,b) => freq_acum.push(a + freq_acum[b]))
    freq_acum.splice(0,1)

    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    let moda = FuncaoModa(elementos, freq)
    let mediana = FuncaoMediana(elementos, freq_acum)

    let ArrayObjt = []
    variavel.forEach((a,b) => ArrayObjt.push({
        Variavel : `${a}`,
        Frequencia : `${freq[b]}`,
        Frequencia_Relativa : `${freq_rel_string[b]}`,
        freq_Percentual : `${freq_acum[b]}`,
        freq_Acumulada : `${freq_acum_por_string[b]}`
    }))

    GeradorTabela(tabela_main, ArrayObjt)
}

function Quantitativa_Continua(array){
    let vet = array.sort((a,b) => a - b)
    const Rol = vet.map(a => parseFloat(a))
    let Xmin = Rol[0]
    let Xmax = Rol[(Rol.length)-1]
    let At = Xmax - Xmin  // Amplitude da tipo
    let K = parseInt(Math.sqrt(Rol.length)) // Número de linhas da tipo
    let IC

    do{
        At +=1
        if((At % K) == 0){
            IC = At / K
        }else if((At % (K - 1)) == 0){
            K -=1
            IC = At / K
        }else if(At % (K + 1) == 0){
            IC = At / K
        }else{
            IC = "não definido"
        }
    }while(IC == "não definido")

    // Definindo classe
    let classe  = []
    for(let i = 0; i < K; i++){
        classe.push(i+1)
    }

    let variavel = [Xmin]
    let freq = []

    for(let i = 1; i <= K; i++){ // Nem acredito que isso funcionou
        variavel.push(variavel[i - 1] + IC)
        freq.push((Rol.filter(a => a >= variavel[i-1] && a < variavel[i])).length) //freq simples
    }

    let freq_acum = [0]
    freq.forEach((a,b) => freq_acum.push(freq_acum[b] + a) ) // freq acumulada
    freq_acum.splice(0,1) // retirando primeiro valor dado na declaração do freq_acum
    
    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    variavel.map((a,b) => variavel[b] = [variavel[b],variavel[b+1] ])
    variavel.pop()
 
    //Valor médio entre cada escopo
    let xi = variavel.map(a => (a[0] + a[1]) / 2)

    let media = FuncaoMedia(xi,freq)
    let moda = FuncaoModa(xi, freq)
    let mediana = FuncaoMedianaContinua(variavel, freq, IC, freq_acum)

    variavel_string = variavel.map(a => a[0] + " |-- " + a[1])

    let ArrayObjetos = []
    classe.forEach((a,b) => ArrayObjetos.push({
        Classe : `${a}`,
        Quantidade : `${variavel_string[b]}`,
        Frequencia : `${freq[b]}`,
        Freq_Percentual : `${freq_rel_string[b]}`,
        Freq_Acumulada : `${freq_acum[b]}`,
        Freq_Acumulada_Percentual : `${freq_acum_por_string[b]}`
    }))
    GeradorTabela(tabela_main, ArrayObjetos)
}

function Quantitativa_Discreta(array){
    let arr = array.map(a => parseFloat(a))
    let arraySort = arr.sort((a,b) => a - b)
    const variavel = [... new Set(arraySort)] // retirando elemento repetidos
    const freq = variavel.map( a => QuantidadeOcorrencia( a, arraySort)) // encontrando freq


    let freq_acum = [0]
    freq.forEach((a,b) => freq_acum.push(a + freq_acum[b]))
    freq_acum.splice(0,1)

    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    const media = FuncaoMedia(variavel, freq)
    const mediana = FuncaoMediana(variavel,freq_acum)
    const moda = FuncaoModa(variavel, freq)

    let ArrayObjt = []
    variavel.forEach((a,b) => ArrayObjt.push({
        Variavel : `${a}`,
        Frequencia : `${freq[b]}`,
        Frequencia_Relativa : `${freq_rel_string[b]}`,
        freq_Percentual : `${freq_acum[b]}`,
        freq_Acumulada : `${freq_acum_por_string[b]}`
    }))
    GeradorTabela(tabela_main, ArrayObjt)
}



//escrever tabela 
function GeradorTabelaHead(table, data){
    let thead = table.createTHead()
    let linha = thead.insertRow()
    for (let key of data) {
        let th = document.createElement("th")
        let text = document.createTextNode(key)
        th.appendChild(text)
        linha.appendChild(th)
    }
}

function GeradorTabela(table, data) {
    let tabela = table
    let titulos = Object.keys(data[0])

    for(element of data){
        let row = table.insertRow()
        for( key in element){
            let cell = row.insertCell()
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
    GeradorTabelaHead(tabela, titulos)
}




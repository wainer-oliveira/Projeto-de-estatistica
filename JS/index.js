let btnGerar = document.getElementById('btnGerar')
const DivMostrarDados = document.getElementById("MostrarDados")
// const tabela_main = document.getElementById("tabelaPrincipal")
// const tabela_MCentrais = document.getElementById("tabelaSecundaria")

function DefineStep(){
    let InputRange = document.getElementById("InputRange")
    let TipoMedida = document.getElementById("TipoMedida").value

    switch(TipoMedida){
    case 'porcentil' :
        InputRange.setAttribute("step","1")
        InputRange.setAttribute("min","1")
        InputRange.setAttribute("max","100")
        break;

    case 'decil' :
        InputRange.setAttribute("step","1")
        InputRange.setAttribute("min","1")
        InputRange.setAttribute("max","10")
        break;

    case 'quartil' :
        InputRange.setAttribute("step","1")
        InputRange.setAttribute("min","1")
        InputRange.setAttribute("max","4")
        break;

    case 'quintil' :
        InputRange.setAttribute("step","1")
        InputRange.setAttribute("min","1")
        InputRange.setAttribute("max","5")
        break;
    }
}

btnGerar.onclick = function pega_elementos(){
    //Captura dos elementos do input
    const nome = document.getElementById("nome")
    let tipo_tabela = document.getElementById("TipoTabela").value
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

function CalculosFrequencias(variavel,freq, media){
    let freq_acum = [0]
    freq.forEach((a,b) => freq_acum.push(a + freq_acum[b]))
    freq_acum.splice(0,1)

    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    let moda = FuncaoModa(variavel, freq)
    let mediana = FuncaoMediana(variavel, freq_acum)

    if(media == "nao") media = "---"

    let ArrayObjt = []
    variavel.forEach((a,b) => ArrayObjt.push({
         Variavel : ` ${a} `,
         Frequencia : ` ${freq[b]} `,
         Frequencia_Relativa : ` ${freq_rel_string[b]} `,
         Freq_Porcentual : ` ${freq_acum[b]} `,
         Freq_Acumulada : ` ${freq_acum_por_string[b]} `
    }))

    let titulos = Object.keys(ArrayObjt[0])
    titulos[0] = `${nome.value}`
    let tabela = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela, titulos)
    GeradorTabela(tabela,ArrayObjt)

    let MediaModaMediana = [{
        Media : `${media}`,
        Moda : `${moda}`,
        Mediana : `${mediana}`}
    ]
    let Tabela2 = CriaTabela(DivMostrarDados)
    let Titulos2 = Object.keys(MediaModaMediana[0])
    GeradorTabelaHead(Tabela2, Titulos2)
    GeradorTabela(Tabela2, MediaModaMediana)
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

//FUNÇÕES DE CALCULOS DE TABULAÇÃO
function Qualitativa_Nominal(array){ 
    const SortArray = array.sort((a,b) => a - b)
    const variavel = [... new Set(SortArray)]
    const freq = variavel.map(a => QuantidadeOcorrencia(a, SortArray))
    let media = "nao"
    CalculosFrequencias(variavel,freq, media)
}

function Qualitativa_Ordinal(array){ 
    const newArray = array.map(a => a.toLowerCase(a))
    const variavel = [... new Set(newArray)]
    const freq = variavel.map(a => QuantidadeOcorrencia(a, newArray))
    const media = "nao"
    CalculosFrequencias(variavel, freq, media)
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
 
    let xi = variavel.map(a => (a[0] + a[1]) / 2) //Valor médio entre cada escopo

    let media = FuncaoMedia(xi,freq)
    let moda = FuncaoModa(xi, freq)
    let mediana = FuncaoMedianaContinua(variavel, freq, IC, freq_acum)

    variavel_string = variavel.map(a => a[0] + " |-- " + a[1])

    let ArrayObjt = []
    classe.forEach((a,b) => ArrayObjt.push({
        Classe : ` ${a} `,
        Variavel : ` ${variavel_string[b]} `,
        Frequencia : ` ${freq[b]} `,
        Frequencia_Relativa : ` ${freq_rel_string[b]} `,
        Freq_Porcentual : ` ${freq_acum[b]} `,
        Freq_Acumulada : ` ${freq_acum_por_string[b]} `
    }))

    let MediaModaMediana = [{
        Media : `${media}`,
        Moda : `${moda}`,
        Mediana : `${mediana}`}]

    let titulos = Object.keys(ArrayObjt[0])
    titulos[1] = `${nome.value}`
    let tabela = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela, titulos)
    GeradorTabela(tabela,ArrayObjt)

    let titulos2 = Object.keys(MediaModaMediana[0])
    let tabela2 = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela2, titulos2)
    GeradorTabela(tabela2, MediaModaMediana)
}

function Quantitativa_Discreta(array){
    const arr = array.map(a => parseFloat(a))
    const arraySort = arr.sort((a,b) => a - b)
    const variavel = [... new Set(arraySort)] // retirando elemento repetidos
    const freq = variavel.map( a => QuantidadeOcorrencia( a, arraySort)) // encontrando freq
    const media = FuncaoMedia(variavel, freq)
    CalculosFrequencias(variavel, freq,media)
}

//escrever tabela 
function CriaTabela(registro){
    let tabela = document.createElement("table")
    registro.appendChild(tabela)
    tabela.setAttribute("class", "tabela")
    tabela.setAttribute("border","1")
    return(tabela)
}

function GeradorTabelaHead(table, data){
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

function GeradorTabela(table, data) {
    let tabela = table
    //let titulos = Object.keys(data[0])

    for(element of data){
        let row = table.insertRow()
        row.setAttribute("class","linha")
        for( key in element){
            let cell = row.insertCell()
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
    //GeradorTabelaHead(tabela, titulos)
}

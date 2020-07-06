let btnGerar = document.getElementById('btnGerar')
const DivMostrarDados = document.getElementById("MostrarDados")

function ModificaAtributos(maximo, InputRange){
    InputRange.setAttribute("step","1")
    InputRange.setAttribute("min","1")
    InputRange.setAttribute("max",`${maximo}`)
}

function DefineStep(){
    let InputRange = document.getElementById("InputRange")
    let TipoMedida = document.getElementById("TipoMedida").value

    switch(TipoMedida){
    case 'porcentil' :
        ModificaAtributos(100, InputRange)
    break;
    case 'decil' :
        ModificaAtributos(10, InputRange)
    break;
    case 'quartil' :
        ModificaAtributos(4, InputRange)
    break;
    case 'quintil' :
        ModificaAtributos(5, InputRange)
    break;
    }
}

btnGerar.onclick = function pega_elementos(){
    //Captura dos elementos do input
    let tipo_tabela = document.getElementById("TipoTabela").value
    let elementosInput = document.getElementById("InputDadosVariavel")
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
function CapturaElementosSeparatrizes(){
    let InputSeparatriz = document.querySelector('input[name="TipoDados"]')
    let separatriz =[]
    if(InputSeparatriz.id == "populacao"){
        separatriz.push(0)
    }else{
        separatriz.push(1)
    }

    const Medida = document.getElementById("TipoMedida").value
    const InputRange = document.getElementById("InputRange").value
    separatriz.push(`${Medida} ${InputRange}`)
    let aux
    
    switch(Medida){
        case 'porcentil' :
            aux = 0.01
            break
        case 'quartil' :
            aux = 0.25
            break
        case 'quintil' :
            aux = 0.2
            break
        case 'decil' :
            aux = 0.1
            break
    }
    separatriz.push(InputRange * aux)
    return separatriz
}

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

    let separatriz = FuncaoSeparatriz(variavel, freq_acum)

    let freq_rel = freq.map(a => (a / freq_acum[freq_acum.length -1]) * 100 )
    let freq_rel_string = freq_rel.map(a => a.toFixed(2) + "%") 

    let freq_acum_por = [0]
    freq_rel.forEach((a,b) => freq_acum_por.push(freq_acum_por[b] + a))
    freq_acum_por.splice(0,1)
    let freq_acum_por_string = freq_acum_por.map(a => a.toFixed(2) + "%")

    let moda = FuncaoModa(variavel, freq)
    let mediana = FuncaoMediana(variavel, freq_acum)

    let ArrayObjt = []
    variavel.forEach((a,b) => ArrayObjt.push({
         Variavel : ` ${a} `,
         Frequencia : ` ${freq[b]} `,
         Frequencia_Relativa : ` ${freq_rel_string[b]} `,
         Fac : ` ${freq_acum[b]} `,
         Fac_Acumulada : ` ${freq_acum_por_string[b]} `
    }))
    
    const nome = document.getElementById("InputNomeVariavel")
    let titulos = [` ${nome.value} `, " Fi ", " Fr% ", " Fac ", " Fac % "]
    let tabela = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela, titulos)
    GeradorTabela(tabela,ArrayObjt)

    if(media == "nao"){
        media = "---"
        let MediaModaMediana = [{
            Media : `${media}`,
            Moda : `${moda}`,
            Mediana : `${mediana}`,
            Separatriz : `${separatriz[1]}`
        }]
    
        let Tabela2 = CriaTabela(DivMostrarDados)
        let Titulos2 = [" Média ", " Moda ", " Mediana ", `${separatriz[0]}`]
        GeradorTabelaHead(Tabela2, Titulos2)
        GeradorTabela(Tabela2, MediaModaMediana)
    }else{
        var DesvioPadrao = FuncaoDesvioPadrao(variavel, freq, media)
        var CoeficienteVariacao = (((DesvioPadrao/media) * 100).toFixed(2) + "%" )
        let MediaModaMediana = [{
            Media : `${media}`,
            Moda : `${moda}`,
            Mediana : `${mediana}`,
            DesvioPadrao : `${DesvioPadrao}`,
            CV : `${CoeficienteVariacao}`,
            Separatriz : `${separatriz[1]}`
        }]
    
        let Tabela2 = CriaTabela(DivMostrarDados)
        let Titulos2 = ["Média", "Moda", "Mediana", "Desvio Padrão", "Coeficiente de Variação",`${separatriz[0]}`]
        GeradorTabelaHead(Tabela2, Titulos2)
        GeradorTabela(Tabela2, MediaModaMediana)
    } 
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

function FuncaoMedianaContinua(array, freq, IntervaloClasse, freqacumulada){ //melhorar
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

//MEDIDAS SEPARATRIZES
function FuncaoSeparatriz(array, freqAcum){   
    let auxiliar = CapturaElementosSeparatrizes()
    let posicao = Math.round((freqAcum[freqAcum.length - 1]) * auxiliar[2])
    let medida = []
    medida.push(auxiliar[1])

    for(let i = 0; i < freqAcum.length; i++){
        if(freqAcum[i] >= posicao){
            medida.push(array[i])
              break
        }
    }
    console.log(medida)
    return medida
}

//FUNÇÕES DE MEDIDAS DE DISPERSÃO
function FuncaoDesvioPadrao(variavel, frequencia, media){
    let separatrizes = CapturaElementosSeparatrizes()
    let DP = variavel.map((a,b) => ((a - media) ** 2) * frequencia[b])
    DP = DP.reduce((a,b) => a + b)
    DP = Math.sqrt(DP / ((frequencia.reduce((a,b) => a + b) - separatrizes[0])))
    return DP.toFixed(2)
}

//FUNÇÕES DE CALCULOS DE TABULAÇÃO
function Qualitativa_Nominal(array){ 
    const SortArray = array.sort((a,b) => a - b)
    const variavel = [... new Set(SortArray)]
    const freq = variavel.map(a => QuantidadeOcorrencia(a, SortArray))
    let media = "nao"
    CalculosFrequencias(variavel,freq, media)

        var ctx = document.getElementById('grafico');
        var grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
}

function Qualitativa_Ordinal(array){ 
    const newArray = array.map(a => a.toLowerCase(a))
    const variavel = [... new Set(newArray)]
    const freq = variavel.map(a => QuantidadeOcorrencia(a, newArray))
    const media = "nao"
    CalculosFrequencias(variavel, freq, media)
}

function Quantitativa_Continua(array){// VERIFICAR A MEDIANA E SEPARATRIZ
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

    const DesvioPadrao = FuncaoDesvioPadrao(xi, freq, media)
    const CoeficienteVariacao = (((DesvioPadrao/media) * 100).toFixed(2) + "%" )
    const separatriz = FuncaoSeparatriz(xi, freq_acum)
    variavel_string = variavel.map(a => a[0] + " |-- " + a[1])

    let ArrayObjt = []
    classe.forEach((a,b) => ArrayObjt.push({
        Classe : ` ${a} `,
        Variavel : ` ${variavel_string[b]} `,
        Frequencia : ` ${freq[b]} `,
        Frequencia_Relativa : ` ${freq_rel_string[b]} `,
        Fac : ` ${freq_acum[b]} `,
        Fac_Acumulada : ` ${freq_acum_por_string[b]} `
    }))

    let TendenciaCentral = [{
        Media : `${media}`,
        Moda : `${moda}`,
        Mediana : `${mediana}`,
        Desvio : `${DesvioPadrao}`,
        CV : `${CoeficienteVariacao}`,
        Separatriz : `${separatriz[1]}` }]

    let titulos = [" Média ", " Moda ", " Mediana ", " Desvio Padrão ", " Coeficiênte de Variação ", ` ${separatriz[0]} `]
    let tabela = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela, titulos)
    GeradorTabela(tabela,ArrayObjt)

    let titulos2 = ["Média", "Moda", "Mediana", "Desvio Padrão", "Coefiente de Variação", `${separatriz[0]}`]
    let tabela2 = CriaTabela(DivMostrarDados)
    GeradorTabelaHead(tabela2, titulos2)
    GeradorTabela(tabela2, TendenciaCentral)
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
function CriaTabela(div){
    let tabela = document.createElement("table")
    div.appendChild(tabela)
    tabela.setAttribute("class", "table")
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

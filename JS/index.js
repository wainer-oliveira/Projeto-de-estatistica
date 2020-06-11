let btn = document.getElementById('botao')

//Acionado por clique do Botão
btn.onclick = function pega_elementos(){

    //Captura dos elementos do input
    const tabela = document.getElementById("tabela")
    const name = document.getElementById("nome")
    let tipotab = document.getElementById("tipo").value
    let elementsInput = document.getElementById("elementos")
    const elementos = elementsInput.value.split(" ")
    
    //Reconhecendo qual tipo de tabela
    switch(tipotab){
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
function FuncaoMedia(array, frequenciaArray){
    let media = array.map((a,b) => a * frequenciaArray[b])
    media = (media.reduce ((a,b) => a+b) ) / (frequenciaArray.reduce((a,b) => a+b))
    media = media.toFixed(2)
    return media
}

function FuncaoModa(array, frequenciaArray){
    let moda
    let maior = Math.max.apply(Math, frequenciaArray)
    let vetorIndex = []

    frequenciaArray.forEach((a,b) => {if(a == maior) vetorIndex.push(b) })

    if(vetorIndex.length == frequenciaArray.length){
        moda = "Amodal"
    }else if(vetorIndex.length == 1){
        moda = array[vetorIndex]
    }else{
        moda =  vetorIndex.map(a => array[a])
    }
    
    return moda
}

function FuncaoMedianaContinua(array, frequencia, IntervaloClasse, frequenciaacumulada){
    let posicao = frequencia.reduce((a,b) => a+b) / 2
    let mediana
    let auxiliar
    
    for(let i=0; i < frequencia.length; i++){
        if(frequenciaacumulada[i] >= posicao ){
            i == 0 ? auxiliar = 0: auxiliar = frequenciaacumulada[i-1]
            mediana = (array[i][0] + (((posicao - auxiliar) / frequencia[i]) * IntervaloClasse))
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
    let elementos = [... new Set(SortArray)]
    let frequencia = elementos.map(a => QuantidadeOcorrencia(a, SortArray))

    let Fac = [0]
    frequencia.forEach((a,b) => Fac.push(a + Fac[b]))
    Fac.splice(0,1)

    let fr = []
    for(let i = 0; i < frequencia.length; i++){
        fr.push((frequencia[i] / Fac[Fac.length -1]) * 100)
    }

    let Fac_porcentagem = [0]
    fr.forEach((a,b) => Fac_porcentagem.push(Fac_porcentagem[b] + a))
    Fac_porcentagem.splice(0,1) 

    let moda = FuncaoModa(elementos, frequencia)
    let mediana = FuncaoMediana(elementos, Fac)
    
    console.log(elementos)
    console.log(frequencia)
    console.log(Fac)
    console.log(fr)
    console.log(Fac_porcentagem)
    console.log(moda)
    console.log(mediana)

}

function Qualitativa_Ordinal(array){ // arrumar
    let newArray = array.map(a => a.toLowerCase(a))
    let elementos = [... new Set(newArray)]
    console.log(elementos)
   let freq = elementos.map(a => QuantidadeOcorrencia(a, newArray))

    let Fac = [0]
    freq.forEach((a,b) => Fac.push(a + Fac[b]))
    Fac.splice(0,1)

    let fr = []
    for(let i = 0; i < freq.length; i++){
        fr.push((freq[i] / Fac[Fac.length -1]) * 100)
    }

    let Fac_porcentagem = [0]
    fr.forEach((a,b) => Fac_porcentagem.push(Fac_porcentagem[b] + a))
    Fac_porcentagem.splice(0,1) 

    let moda = FuncaoModa(elementos, freq)
    let mediana = FuncaoMediana(elementos, Fac)

    console.log(newArray)
    console.log(elementos)
    console.log(freq)
    console.log(Fac)
    console.log(fr)
    console.log(Fac_porcentagem)
    console.log(moda)
    console.log(mediana)
    alert("Qualitativa Ordinal teste")
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
            IC = 0
        }
    }while(IC == 0)

    // Definindo classe
    let classe  = []
    for(let i = 0; i < K; i++){
        classe.push(i+1)
    }

    let escopo = [Xmin]
    let frequencia = []

    for(let i = 1; i <= K; i++){ // Nem acredito que isso funcionou
        escopo.push(escopo[i - 1] + IC)
        frequencia.push((Rol.filter(a => a >= escopo[i-1] && a < escopo[i])).length) //frequencia simples
    }
   
    let Fac = [0]
    frequencia.forEach((a,b) => Fac.push(Fac[b] + a) ) // frequencia acumulada
    Fac.splice(0,1) // retirando primeiro valor dado na declaração do Fac
    
    let fr = []
    for (let i = 0; i < K; i++){
        fr.push((frequencia[i] / Fac[K - 1]) * 100) // Frequencia em procentagem
    }
    
    let Fac_porcentagem = [0]
    fr.forEach((a,b) => Fac_porcentagem.push(Fac_porcentagem[b] + a)) //Frequencia acumulada em porcentagem
    Fac_porcentagem.splice(0,1) 


    escopo.map((a,b) => escopo[b] = [escopo[b],escopo[b+1] ])
    escopo.pop()

    //Valor médio entre cada escopo
    let xi = escopo.map(a => (a[0] + a[1]) / 2)

    let media = FuncaoMedia(xi, frequencia)
    let moda = FuncaoModa(xi, frequencia)
    let mediana = FuncaoMedianaContinua(escopo, frequencia,IC, Fac)

    let FacPorcString = Fac_porcentagem.map(a => a + "%")
    let frString = fr.map(a => a + "%")
    escopo_string = escopo.map(a => a[0] + " |-- " + a[1])

    let titulos = [" Classe "," Quantidade ", " Frequencia ", " Frequencia(%) ", "Frequencia Acum ", " Frequencia Acum (%) "]
    let arraydados = [classe, escopo_string, frequencia, fr, Fac, FacPorcString]
    EscreverTabela(titulos, arraydados)
}

function Quantitativa_Discreta(array){
    let arr = array.map(a => parseFloat(a))
    let arraySort = arr.sort((a,b) => a - b)
    const elementos = [... new Set(arraySort)] // retirando elemento repetidos
    const frequencia = elementos.map(a => QuantidadeOcorrencia(a,arraySort)) // encontrando frequencia

    let Fac = [0]
    frequencia.forEach((a,b) => Fac.push(Fac[b] + a) ) // frequencia acumulada
    Fac.splice(0,1) // retirando primeiro valor dado na declaração do Fac

    let fr = []
    for (let i = 0; i < frequencia.length; i++){
        fr.push((frequencia[i] / Fac[Fac.length - 1]) * 100) // Frequencia em procentagem
    }  
    
    let Fac_porcentagem = [0]
    fr.forEach((a,b) => Fac_porcentagem.push(Fac_porcentagem[b] + a)) //Frequencia acumulada em porcentagem
    Fac_porcentagem.splice(0,1) 

    const media = FuncaoMedia(elementos, frequencia)
    const mediana = FuncaoMediana(elementos,Fac)
    const moda = FuncaoModa(elementos, frequencia)

    console.log(mediana)    
    alert('quantitativa Discreta teste')
}


//escrever tabela (provisório)
function CriarTag(elemento){
    return document.createElement(elemento)
}

function CriarCelula(tag, text){
    tag = CriarTag(tag)
    tag.textContent = text
    return tag
}

function EscreverTabela(arrayNomes, arrayDados){
    let thead = CriarTag("thead")
    let tbody = CriarTag("tbody")
    let linhahead = CriarTag("tr")
    for(let i = 0; i < arrayNomes.length; i++){
        let th = CriarCelula("th", arrayNomes[i])
        linhahead.appendChild(th)
    }

    thead.appendChild(linhahead)

    for(let i = 0; i < arrayDados[0].length; i++){
        let linhabody = CriarTag("tr")
        for(let j = 0; j < arrayDados.length; j++){
            let cel = CriarCelula("td", arrayDados[j][i])
            linhabody.appendChild(cel)
        }
        tbody.appendChild(linhabody)
    }

    tabela.appendChild(thead)
    tabela.appendChild(tbody)

}


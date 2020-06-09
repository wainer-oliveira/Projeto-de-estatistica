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
    
    for(let i=0; i < (frequencia.length - 1); i++){
        if(frequenciaacumulada[i] >= posicao ){
            i == 0 ? auxiliar = 0: auxiliar = frequenciaacumulada[i-1]
            mediana = (array[i][0] + (((posicao - auxiliar) / frequencia[i]) * IntervaloClasse))
            return mediana.toFixed(2)
        }
    }
}

function FuncaoMediana(){

}

//FUNÇÕES DE CALCULOS DE TABULAÇÃO
function Qualitativa_Nominal(array){ // FAZER MEDIANA
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

    let moda = FuncaoModa(elementos, frequencia)
    
    Fac_porcentagem.splice(0,1) 

    console.log(elementos)
    console.log(frequencia)
    console.log(Fac)
    console.log(fr)
    console.log(Fac_porcentagem)
    console.log(moda)

}

function Qualitativa_Ordinal(array){
    alert("Qualitativa Ordinal teste")
}

function Quantitativa_Continua(array){
    let vet = array.sort((a,b) => a - b)
    const Rol = vet.map(a => parseFloat(a))
    let Xmin = Rol[0]
    let Xmax = Rol[(Rol.length)-1]
    let At = Xmax - Xmin  // Amplitude da Tabela
    const K = parseInt(Math.sqrt(Rol.length)) // Número de linhas da tabela
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

    // por % em fr e fac_porcentagem
    // adicionar |-- no escopo
    EscreverTabela(classe, escopo, frequencia, fr, Fac, Fac_porcentagem)
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
    const mediana = FuncaoMediana()
    const moda = FuncaoModa(elementos, frequencia)

    console.log(elementos)
    console.log(frequencia)
    console.log(Fac)
    console.log(fr)
    console.log(Fac_porcentagem)
    
    alert('quantitativa Discreta teste')
}

function EscreverTabela(a,b,c,d,e,f){
    alert(a + " teste")
    alert(b + " teste")
    alert(c + " teste")
    alert(d + " teste")
    alert(e + " teste")
    alert(f + " teste")
}


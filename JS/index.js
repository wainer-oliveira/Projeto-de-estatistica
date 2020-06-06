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

function FuncaoMedia(array, frequenciaArray){
    let media = []
    array.forEach((a,b) => media.push(a * frequenciaArray[b]) )
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
            mediana = mediana.toFixed(2)
            return mediana
        }
    }
}


function Qualitativa_Nominal(array){
    alert('qualitativa Nominal teste')
}

function Qualitativa_Ordinal(array){
    alert("Qualitativa Ordinal teste")
}

function Quantitativa_Continua(elementos){
    let Rol = elementos.sort((a,b) => a - b)
    let Xmin = Rol[0]
    let Xmax = Rol[(Rol.length)-1]
    let At = Xmax - Xmin  // Amplitude da Tabela
    let K = parseInt(Math.sqrt(Rol.length)) // Número de linhas da tabela


    do{
        At +=1
        if((At % K) == 0){
            var IC = At / K
        }else if((At % (K - 1)) == 0){
            K -=1
            var IC = At / K
        }else if(At % (K + 1) == 0){
            var IC = At / K
        }else{
            var IC = 0
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
    
    let Fr = []
    for (let i = 0; i < K; i++){
        Fr.push((frequencia[i] / Fac[K - 1]) * 100) // Frequencia em procentagem
    }
    
    let Fac_percentagem = [0]
    Fr.forEach((a,b) => Fac_percentagem.push(Fac_percentagem[b] + a)) //Frequencia acumulada em porcentagem
    Fac_percentagem.splice(0,1) 


    escopo.map((a,b) => escopo[b] = [escopo[b],escopo[b+1] ])
    escopo.pop()

    //Valor médio entre cada escopo
    let xi = escopo.map(a => (a[0] + a[1]) / 2)

    let media = FuncaoMedia(xi, frequencia)
    let moda = FuncaoModa(xi, frequencia)
    let mediana = FuncaoMedianaContinua(escopo, frequencia,IC, Fac)

    console.log(Rol)
    console.log(At)
    console.log(K)
    console.log(classe)
    console.log(frequencia)
    console.log(IC)
    console.log(escopo)
    console.log(Fac)
    console.log(Fac_percentagem)
    console.log(Fr)
    console.log(xi)
    console.log(media)
    console.log(moda)
    console.log(mediana)

    // por % em fr e fac_porcentagem
    // adicionar |-- no escopo

}


function Quantitativa_Discreta(array){
    alert('quantitativa Discreta teste')
}



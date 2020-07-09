//Funções de Frequencias
function CalcularFrequenciaAcumulada(frequenciasimples){
    let frequenciaacumulada = [0]
    frequenciasimples.forEach((a,b) => frequenciaacumulada.push(a + frequenciaacumulada[b]))
    frequenciaacumulada.splice(0,1)
    return frequenciaacumulada
}

function CalcularFrequenciaRelativa(frequenciasimples, frequenciaacumulada){
    let frequenciarelativa = frequenciasimples.map(a => (a / frequenciaacumulada[frequenciaacumulada.length -1]) * 100 )
    frequenciarelativa = frequenciarelativa.map(a => a.toFixed(2))
    return frequenciarelativa
}

function CalcularFacPorcentagem(fr){
    let facporcentagem = [0]
    fr.forEach((a,b) => facporcentagem.push(facporcentagem[b] + Number(a)))
    facporcentagem.splice(0,1)
    facporcentagem = facporcentagem.map(a => a.toFixed(2) + "%")
    return facporcentagem
}

//Funções Principais
function CalcularQualitativa(nome, array, separatriz){ 
    let newArray = array.map(a => a.toLowerCase(a))
    let elementos = [... new Set(newArray)]
    let frequenciaSimples = elementos.map(a => QuantidadeOcorrencia(a, newArray))
    let frequenciaAcumulada = CalcularFrequenciaAcumulada(frequenciaSimples)
    let frequenciaRelativa = CalcularFrequenciaRelativa(frequenciaSimples, frequenciaAcumulada)
    let frequenciaAcumuladaPorcentagem = CalcularFacPorcentagem(frequenciaRelativa)

    let graf = frequenciaRelativa
    frequenciaRelativa = frequenciaRelativa.map(a => a + "%")

    let mediana = FuncaoMediana(elementos, frequenciaAcumulada)
    let moda = FuncaoModa(elementos, frequenciaSimples)

    let titulosTabela = [` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]

    let dadostabela = []
    frequenciaSimples.forEach((a,b) => dadostabela.push(
    [`${elementos[b]}`, `${frequenciaSimples[b]}`, `${frequenciaRelativa[b]}`, `${frequenciaAcumulada[b]}`, `${frequenciaAcumuladaPorcentagem[b]}`]
    ))
     
    let novadiv = CriarDiv()

    let tabela = CriarTabela(novadiv)
    GerarTableHead(tabela, titulosTabela)
    GerarTable(tabela, dadostabela)
    novadiv.innerHTML += `<hr>`
    let separatrizvalue = "---"
    if(separatriz[1] != "inativo"){
        separatrizvalue = FuncaoSeparatriz(elementos, frequenciaAcumulada, separatriz[2])
        dadostabela2 = [[`${moda}`, `${mediana}`, `${separatriz[1]} ${separatriz[3]} : ${separatrizvalue}`]]
    }else{
        dadostabela2 = [[`${moda}`, `${mediana}`, `${separatrizvalue}`]]
    }
    titulosTabela2 = ["Moda", "Mediana", "Separatriz"]
    
    let tabela2 = CriarTabela(novadiv)
    GerarTableHead(tabela2, titulosTabela2)
    GerarTable(tabela2, dadostabela2)
    desenharchart(novadiv,nome, elementos, graf,'pie')
}

function CalcularQuantitativaDiscreta(nome, array, separatriz){ 
    let arraysort = array.sort((a,b) => a - b)
    let elementos = [... new Set(arraysort)]
    let frequenciaSimples = elementos.map(a => QuantidadeOcorrencia(a, arraysort))
    let frequenciaAcumulada = CalcularFrequenciaAcumulada(frequenciaSimples)
    let frequenciaRelativa = CalcularFrequenciaRelativa(frequenciaSimples, frequenciaAcumulada)
    let frequenciaAcumuladaPorcentagem = CalcularFacPorcentagem(frequenciaRelativa)
    let graf = frequenciaRelativa
    frequenciaRelativa = frequenciaRelativa.map(a => a + "%")

    let media = FuncaoMedia(elementos, frequenciaSimples)
    let moda = FuncaoModa(elementos, frequenciaSimples)
    let mediana = FuncaoMediana(elementos, frequenciaAcumulada)
    let DesvioPadrao = FuncaoDesvioPadrao(elementos, frequenciaSimples, media, separatriz[0])
    let CoeficienteVariacao = (((DesvioPadrao/media) * 100).toFixed(2) + "%" )

    let titulosTabela = [` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]

    let dadostabela = []
    frequenciaSimples.forEach((a,b) => dadostabela.push(
    [`${elementos[b]}`, `${frequenciaSimples[b]}`, `${frequenciaRelativa[b]}`, `${frequenciaAcumulada[b]}`, `${frequenciaAcumuladaPorcentagem[b]}`]
    ))
     
    let novadiv = CriarDiv()
    let tabela = CriarTabela(novadiv)
    GerarTableHead(tabela, titulosTabela)
    GerarTable(tabela, dadostabela)
    novadiv.innerHTML += `<hr>`
    let separatrizvalue = "---"
    if(separatriz[1] != "inativo"){
        separatrizvalue = FuncaoSeparatriz(elementos, frequenciaAcumulada, separatriz[2])
        dadostabela2 = [[`${media}`,`${moda}`, `${mediana}`, `${DesvioPadrao}`, `${CoeficienteVariacao}`, `${separatriz[1]} ${separatriz[3]} : ${separatrizvalue}`]]
    }else{
        dadostabela2 = [[`${media}`,`${moda}`, `${mediana}`, `${DesvioPadrao}`, `${CoeficienteVariacao}`, `${separatrizvalue}`]]
    }

    titulosTabela2 = ["Média" , "Moda", "Mediana", "Desvio Padrão", "Coeficiente de Variação", "Separatriz"]
    let tabela2 = CriarTabela(novadiv)
    GerarTableHead(tabela2, titulosTabela2)
    GerarTable(tabela2, dadostabela2)
    desenharchart(novadiv,nome, elementos, graf,'bar')
}

function CalcularQuantitativaContinua(nome,array, separatriz){
    let Rol = array.sort((a,b) => a - b);
    let Xmin = Rol[0];
    let Xmax = Rol[(Rol.length)-1];
    let At = Xmax - Xmin;  // Amplitude da tipo
    let K = parseInt(Math.sqrt(Rol.length)); // Número de linhas da tipo
    let IC;

    do{
        At +=1;
        if((At % K) == 0){
            IC = At / K;
        }else if((At % (K - 1)) == 0){
            K -=1;
            IC = At / K;
        }else if(At % (K + 1) == 0){
            IC = At / K;
        }else{
            IC = "não definido";
        }
    }while(IC == "não definido")

    // Definindo classe
    let classe  = [];
    for(let i = 0; i < K; i++){
        classe.push(i+1);
    }

    let elementos = [Xmin]
    let frequenciaSimples = []

    for(let i = 1; i <= K; i++){ // Nem acredito que isso funcionou
        elementos.push(elementos[i - 1] + IC)
        frequenciaSimples.push((Rol.filter(a => a >= elementos[i-1] && a < elementos[i])).length) //freq simples
    }

    let frequenciaAcumulada = [0]
    frequenciaSimples.forEach((a,b) => frequenciaAcumulada.push(frequenciaAcumulada[b] + a) ) // freq acumulada
    frequenciaAcumulada.splice(0,1) // retirando primeiro valor dado na declaração do freq_acum
    let frequenciaRelativa = frequenciaSimples.map(a => (a / frequenciaAcumulada[frequenciaAcumulada.length -1]) * 100 )

    let frequenciaAcumuladaPorcentagem = [0]
    frequenciaRelativa.forEach((a,b) => frequenciaAcumuladaPorcentagem.push(frequenciaAcumuladaPorcentagem[b] + a))
    frequenciaAcumuladaPorcentagem.splice(0,1)
    frequenciaAcumuladaPorcentagem = frequenciaAcumuladaPorcentagem.map(a => a.toFixed(2) + "%")
    let graf = frequenciaRelativa
    frequenciaRelativa = frequenciaRelativa.map(a => a.toFixed(2) + "%") 

    elementos.map((a,b) => elementos[b] = [elementos[b],elementos[b+1] ])
    elementos.pop()
 
    let xi = elementos.map(a => (a[0] + a[1]) / 2) //Valor médio entre cada escopo

    let media = FuncaoMedia(xi,frequenciaSimples)
    let moda = FuncaoModa(xi, frequenciaSimples)
    let mediana = FuncaoSeparatriz(xi, frequenciaAcumulada, separatriz[2])
    let DesvioPadrao = FuncaoDesvioPadrao(xi, frequenciaSimples, media, 0.5)
    let CoeficienteVariacao = (((DesvioPadrao/media) * 100).toFixed(2) + "%" )

    elementos = elementos.map(a => a[0] + " |-- " + a[1])

    let titulosTabela = ["Classe",` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]

    let dadostabela = []
    frequenciaSimples.forEach((a,b) => dadostabela.push(
    [`${classe[b]}`,`${elementos[b]}`, `${frequenciaSimples[b]}`, `${frequenciaRelativa[b]}`, `${frequenciaAcumulada[b]}`, `${frequenciaAcumuladaPorcentagem[b]}`]
    ))

    let novadiv = CriarDiv()
    let tabela = CriarTabela(novadiv)
    GerarTableHead(tabela, titulosTabela)
    GerarTable(tabela, dadostabela)
    novadiv.innerHTML += `<hr>`
    let separatrizvalue = "---"
    if(separatriz[1] != "inativo"){
        separatrizvalue = FuncaoSeparatriz(xi, frequenciaAcumulada, separatriz[2])
        dadostabela2 = [[`${media}`,`${moda}`, `${mediana}`, `${DesvioPadrao}`, `${CoeficienteVariacao}`, `${separatriz[1]} ${separatriz[3]} : ${separatrizvalue}`]]
    }else{
        dadostabela2 = [[`${media}`,`${moda}`, `${mediana}`, `${DesvioPadrao}`, `${CoeficienteVariacao}`, `${separatrizvalue}`]]
    }

    titulosTabela2 = ["Média" , "Moda", "Mediana", "Desvio Padrão", "Coeficiente de Variação", "Separatriz"]
    
    let tabela2 = CriarTabela(novadiv)
    GerarTableHead(tabela2, titulosTabela2)
    GerarTable(tabela2, dadostabela2)
    desenharchartContinua(novadiv,nome, elementos, graf)
}

//Funções de Tabela
function CriarDiv(){
    let divMostrarDados = document.getElementById("MostrarDados")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("class", "jumbotron pt-0 mb-2")
    divMostrarDados.appendChild(newdiv)
    return newdiv
}

function CriarTabela(div){
    let tabela = document.createElement("table")
    div.appendChild(tabela)
    tabela.setAttribute("class", "table table-bordered table-dark")
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

function desenharchart(div,nome,nomes, dados,tipo){
    let local = document.createElement("canvas")
    div.appendChild(local)
    var ctx = local;
        var grafico = new Chart(ctx, {
            type: `${tipo}`,
            data: {
                labels: nomes,
                datasets: [{
                    label: nome,
                    data: dados,
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

function desenharchartContinua(div,nome,nomes, dados){
    let local = document.createElement("canvas")
    div.appendChild(local)
    var ctx = local;
        var grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nomes,
                datasets: [{
                    label: nome,
                    data: dados,
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
                    xAxes: [{
                        display: false,
                        barPercentage: 1.30,
                      }, {
                        display: true,
                      }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
}

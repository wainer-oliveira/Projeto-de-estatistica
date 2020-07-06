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

    frequenciaRelativa = frequenciaRelativa.map(a => a + "%")

    let mediana = FuncaoMediana(elementos, frequenciaAcumulada)
    let moda = FuncaoModa(elementos, frequenciaSimples)

    let titulosTabelaPrincipal = [` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]
    let titulosTabelaSecundaria = ["Moda", "Mediana"]

    let dadostabelaprincipal = []
    frequenciaSimples.forEach((a,b) => dadostabelaprincipal.push(
    [`${elementos[b]}`, `${frequenciaSimples[b]}`, `${frequenciaRelativa[b]}`, `${frequenciaAcumulada[b]}`, `${frequenciaAcumuladaPorcentagem[b]}`]
    ))
     
    let novadiv = CriarDiv()

    novadiv.innerHTML = `<p class="lead">Moda : ${moda}</p>`
    novadiv.innerHTML += `<p class="lead">mediana :  ${mediana}</p>`

    let tabelaprincipal = CriarTabela(novadiv)
    GerarTableHead(tabelaprincipal, titulosTabelaPrincipal)
    GerarTable(tabelaprincipal, dadostabelaprincipal)
}

function CalcularQuantitativaDiscreta(nome, array){ 
    let arraysort = array.sort((a,b) => a - b)
    let elementos = [... new Set(arraysort)]
    let frequenciaSimples = elementos.map(a => QuantidadeOcorrencia(a, arraysort))
    let frequenciaAcumulada = CalcularFrequenciaAcumulada(frequenciaSimples)
    let frequenciaRelativa = CalcularFrequenciaRelativa(frequenciaSimples, frequenciaAcumulada)
    let frequenciaAcumuladaPorcentagem = CalcularFacPorcentagem(frequenciaRelativa)
    frequenciaRelativa = frequenciaRelativa.map(a => a + "%")

    let media = FuncaoMedia(elementos, frequenciaSimples)
    let moda = FuncaoModa(elementos, frequenciaSimples)
    let mediana = FuncaoMediana(elementos, frequenciaAcumulada)

    let titulosTabelaPrincipal = [` ${nome}`, " Fi ", " Fr% ", " Fac ", " Fac % "]

    let dadostabelaprincipal = []
    frequenciaSimples.forEach((a,b) => dadostabelaprincipal.push(
    [`${elementos[b]}`, `${frequenciaSimples[b]}`, `${frequenciaRelativa[b]}`, `${frequenciaAcumulada[b]}`, `${frequenciaAcumuladaPorcentagem[b]}`]
    ))
     
    let novadiv = CriarDiv()
    console.log(media)
    novadiv.innerHTML = `<hr>`
    novadiv.innerHTML += `<p class="lead">Média : ${media}</p>` 
    novadiv.innerHTML += `<p class="lead">Moda : ${moda}</p>`
    novadiv.innerHTML += `<p class="lead">mediana :  ${mediana}</p>`

    let tabelaprincipal = CriarTabela(novadiv)
    GerarTableHead(tabelaprincipal, titulosTabelaPrincipal)
    GerarTable(tabelaprincipal, dadostabelaprincipal)
}


//Funções de Tabela
function CriarDiv(){
    let divMostrarDados = document.getElementById("MostrarDados")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("class", "container mb-3")
    divMostrarDados.appendChild(newdiv)
    return newdiv
}

function CriarTabela(div){
    let tabela = document.createElement("table")
    div.appendChild(tabela)
    tabela.setAttribute("class", "table mt-5")
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
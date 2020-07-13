const calcul = document.getElementById("btnReg")
const atual = document.getElementById("btnAtu")


calcul.onclick = function calcular(){
    // transformando em array
    let arrayx = ((document.getElementById("InputX").value).split(" "))
    let arrayy = ((document.getElementById("InputY").value).split(" "))
    //let x =((document.getElementById("InputX").value).split(" "))
    //let y = ((document.getElementById("InputY").value).split(" "))
    //let arrayx = TratarInputNumber(x)
    //let arrayy =  TratarInputNumber(y)

    arrayx = arrayx.map((conversao) => Number(conversao))
    arrayy = arrayy.map((conversao) => Number(conversao))
    let n = arrayx.length

    // somando os valores dos array X e Y
    let totalx = arrayx.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)
    let totaly = arrayy.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)

    // pontenciação dos arrays x e y
    let arrayx2 = arrayx.map(( acumulador, valorAtual ) => acumulador ** 2)
    let arrayy2 = arrayy.map(( acumulador, valorAtual ) => acumulador ** 2)
    let x2 = arrayx2.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)
    let y2 = arrayy2.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)

    // multiplicação dos dois arrays     
    let multXY = (arrayx.reduce(function(r,a,i){return r+a*arrayy[i]},0));

    // função da correlação
    let r = (n * multXY - totalx * totaly) / Math.sqrt((n * x2 - totalx ** 2) * (n * y2 - totaly ** 2))
    r = r.toFixed(4)
    let preproX = (n * multXY - totalx * totaly) / (n * x2 - totalx ** 2)
    let preproY = (totaly / n) - preproX * (totalx / n)

    if(r > 0.9 || r < -0.9){
        classi = 'Muito Forte'
    }else if(r > 0.7 || r < -0.7){
        classi = 'Forte'
    }else if(r > 0.5 || r < -0.5){
        classi = 'Moderada'
    }else if(r > 0.3 || r < -0.3){
        classi = 'Fraca'
    }else if(r > 0 || r < 0){
        classi = 'Desprezíel'
    }else{
        classi = 'Incompatível'
    }
    //=========================//   

    let dadosgrafico = arrayx.map((a,b) => ({
        x : a,
        y : arrayy[b]
    }))

    let dadoslinha = arrayx.map((a,b) => ({
        x : ((a + arrayy[b]) / 2),
        y : ((a + arrayy[b]) / 2)
    }))

    let div = CriarDiv()
    PrintarResultados(div, r,classi)
    desenharchart(div,dadosgrafico, dadoslinha)

    let divremendo = CriarDiv()
    let p = document.createElement('p')
    p.setAttribute('class','lead')
    p.setAttribute('id','atualizar')
    divremendo.appendChild(p)
}

atual.onclick = function atualizar(){
    let capX = Number(document.getElementById("proX").value) 
    let capY = Number(document.getElementById("proY").value)
    console.log(capX)
    console.log(capY)

    let arrayx = ((document.getElementById("InputX").value).split(" "))
    let arrayy = ((document.getElementById("InputY").value).split(" "))
    arrayx = arrayx.map((conversao) => Number(conversao))
    arrayy = arrayy.map((conversao) => Number(conversao))
    let n = arrayx.length

    // somando os valores dos array X e Y
    let totalx = arrayx.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)
    let totaly = arrayy.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)

    // pontenciação dos arrays x e y
    let arrayx2 = arrayx.map(( acumulador, valorAtual ) => acumulador ** 2)
    let arrayy2 = arrayy.map(( acumulador, valorAtual ) => acumulador ** 2)
    let x2 = arrayx2.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)
    let y2 = arrayy2.reduce(( acumulador, valorAtual ) => acumulador + valorAtual,0)

    // multiplicação dos dois arrays     
    let multXY = (arrayx.reduce(function(r,a,i){return r+a*arrayy[i]},0));

    // função da correlação
    let r = (n * multXY - totalx * totaly) / Math.sqrt((n * x2 - totalx ** 2) * (n * y2 - totaly ** 2))
    r = r.toFixed(4)
    let preproX = (n * multXY - totalx * totaly) / (n * x2 - totalx ** 2)
    let preproY = (totaly / n) - preproX * (totalx / n)

    let projecao
    if(capX > 0 && capY > 0){
        alert("Adicione apenas um dos dados")
    }else if(capX > 0){
        projecao = (preproX * capX + preproY).toFixed(2)
    }else if(capY > 0){
        projecao = ((capY - (preproY)) / preproX).toFixed(2)
    }else{
        alert("Dados Inválidos")
    }
    //=========================//  
    if(projecao != undefined){
        document.getElementById("atualizar").innerHTML = ` Projeção : ${projecao}`
    }
}

function PrintarResultados(div,Relacao, Classificacao){
    let p = document.createElement('p')
    p.setAttribute('class','lead')
    p.innerHTML = `Correlação : ${Relacao}`
    let p2 = document.createElement('p')
    p2.setAttribute('class','lead')
    p2.innerHTML = `Classificação : ${Classificacao}`
    div.appendChild(p)
    div.appendChild(p2)
    document.getElementById("result").innerHTML = ""
    document.getElementById("result").appendChild(div)
}

function CriarDiv(){
    let divMostrarDados = document.getElementById("result")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("class", "jumbotron pt-0 mb-2")
    newdiv.setAttribute("id", "teste")
    divMostrarDados.appendChild(newdiv)
    return newdiv
}

function desenharchart(div,date, datelinha){
    let local = document.createElement("canvas")
    div.appendChild(local)
    var ctx = local
    var grafico = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                pointBackgroundColor: 'red',
                data: date,
                //borderWidth : 1
            }/*,{
                data : datelinha,
                type : 'line',
                fill : false,
                pointRadius : 0
            }*/
        ]
        },
        options: {
            title: {
                text: 'Regressão',
                fontSize: 15,
                display: true,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
    /*
    grafico += new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                pointBackgroundColor: 'red',
                data: datelinha
            }]
        },
        options: {
            title: {
                text: 'Regressão',
                fontSize: 15,
                display: true,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });*/

}

function zerar(local){
    local.value = ""
}

let InputFile = document.getElementById("uploadFileRegressao")
InputFile.addEventListener('change',() => {
    readXlsxFile(InputFile.files[0]).then((data) => {
        let dados = document.getElementById("InputX")
        let dados2 = document.getElementById("InputY")
        zerar(dados)
        zerar(dados2)
        console.log()
        
      for(let i = 0; i < data.length; i++){
        console.log(data[i][0])
        if(i == data.length-1){
            dados.value += `${data[i][0]}`
            dados2.value += `${data[i][1]}`
            
            break
        }   
        dados.value += `${data[i][0]} `
        dados2.value += `${data[i][1]} `
      }
    })
})

function TratarInputNumber(array){
    let inputelementos = array
    let elementos = []
    if(inputelementos.value == ""){
        alert("Insira os elementos para que possamos continuar!")
    }else{
        elementos = inputelementos
    }
    elementos = elementos.filter(a => a != "")
    elementos = elementos.sort((a,b) => a - b)
    elementos = elementos.filter(a => Number(a) == a)
    if(elementos.length == 0){
        alert("DADOS INVÁLIDOS!")
    }else{
        elementos = elementos.map(a => Number(a))
        return elementos
    }
}

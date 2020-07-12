const inputx = document.getElementById("InputX")
const inputy = document.getElementById("InputY")
const calcul = document.getElementById("btnReg")
const projeX = document.getElementById("proX")
const projeY = document.getElementById("proY")
const atual = document.getElementById("btnAtu")


calcul.onclick = function calcular(){
    
    // transformando em array
    let arrayx = inputx.value.split(" ")
    let arrayy = inputy.value.split(" ")
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
    r = r.toFixed(2)
    preproX = (n * multXY - totalx * totaly) / (n * x2 - totalx ** 2)
    preproY = (totaly / n) - preproX * (totalx / n)

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
    console.log(r)
    console.log(classi)

    PrintarResultados(r,classi)
}

function PrintarResultados(Relacao, Classificacao){
    let div = CriarDiv()
    let p = document.createElement('p')
    p.setAttribute('class','lead')
    p.innerHTML = `Relação : ${Relacao}`
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
    divMostrarDados.appendChild(newdiv)
    return newdiv
}


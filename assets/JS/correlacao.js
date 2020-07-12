const inputx = document.getElementById("InputX")
const inputy = document.getElementById("InputY")



function calcular(){
    
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
    let r = (n * multXY - totalx * totaly) / Math.sqrt((n * x2 - totalx ** 2) * (n * y2 - totaly ** 2)).toFixed(2)
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
    console.log(preproX) 
    console.log(preproY)
    console.log(classi)
}


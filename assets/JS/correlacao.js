const inputx = document.getElementById("InputX")
const inputy = document.getElementById("InputY")

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
let x2 = Math.pow(totalx, 2)
let y2 = Math.pow(totaly, 2)

// multiplicação dos dois arrays
var sum = 0;
for(var i=0; i< arr1.length; i++) {
sum += arr1[i]*arr2[i];
}

let multXY = (arrayx.reduce(function(r,a,i){return r+a*arrayy[i]},0));

// função da correlação
let r = (n * multXY - totalx * totaly) / (Math.sqrt((n * x2 - (totalx ** 2)) * (n * y2 - totaly ** 2)))

//=========================//
console.log(arrayx)
console.log(arrayy)
console.log(totalx)
console.log(totaly) 
console.log(x2) 
console.log(y2) 
console.log(multXY)
console.log(r) 
console.log(n) 


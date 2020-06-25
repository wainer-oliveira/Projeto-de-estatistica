const btnBi = document.getElementById("btnbinomal")
const divteste = document.getElementById("testes")

function fatorial(n){
    if(n == 0 || n == 1){
        return 1
    }else{
        return n * (fatorial(n -1))
    }
}

function AnaliseCombinatoria(n1,n2){
    if(n2 == 1) return n1
    if(n1 != n2 && n2 != 0){
        let resultado
        const fatorial1 = fatorial(n1)
        const fatorial2 = fatorial((n1 - n2))
        const fatorial3 = fatorial(n2)
        resultado = fatorial1 / (fatorial2 * fatorial3)
        return resultado
    }else{
        return 1
    }
}

btnBi.onclick = function binomial(){
    let n = document.getElementById("n").value
    let k = document.getElementById("k").value
    let p = document.getElementById("p").value
    let q = (100 - p) / 100 
    p = p / 100

    if ( (k - n) >  0 ){
        alert("N necessita ser maior do que K ")
    }else{
        var anacomb = AnaliseCombinatoria(n,k)
        var resultado = (anacomb * ( p ** k )) * (q ** ( n - k))
    }
    console.log(resultado)
}


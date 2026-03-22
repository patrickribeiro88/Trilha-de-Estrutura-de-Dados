/*2. Problema do Caixeiro Viajante: 
○ Implemente uma solução de força bruta para o Problema do Caixeiro Viajante 
e teste em um conjunto pequeno de cidades (máximo de 5 cidades). 
○ Implemente o Algoritmo de Vizinho Mais Próximo para resolver o TSP e 
compare o resultado com a solução exata para um conjunto de 10 cidades.*/ 

// -----------------------------------------------------
// FUNÇÃO PARA GERAR TODAS AS PERMUTAÇÕES
// -----------------------------------------------------
function permutar(arr) {
    if (arr.length === 1) {
        return [arr];
    }

    let resultado = [];

    for (let i = 0; i < arr.length; i++) {
        let atual = arr[i];
        let restante = arr.slice(0, i).concat(arr.slice(i + 1));
        let permutacoesRestantes = permutar(restante);

        for (let perm of permutacoesRestantes) {
            resultado.push([atual, ...perm]);
        }
    }

    return resultado;
}

// -----------------------------------------------------
// FUNÇÃO PARA CALCULAR O CUSTO TOTAL DE UMA ROTA
// -----------------------------------------------------
function calcularCustoRota(rota, matriz) {
    let custo = 0;

    for (let i = 0; i < rota.length - 1; i++) {
        custo += matriz[rota[i]][rota[i + 1]];
    }

    // volta para a cidade inicial
    custo += matriz[rota[rota.length - 1]][rota[0]];

    return custo;
}

// -----------------------------------------------------
// TSP POR FORÇA BRUTA
// Começa sempre pela cidade 0
// -----------------------------------------------------
function tspForcaBruta(matriz) {
    let n = matriz.length;
    let cidades = [];

    for (let i = 1; i < n; i++) {
        cidades.push(i);
    }

    let todasRotas = permutar(cidades);

    let melhorRota = [];
    let menorCusto = Infinity;

    for (let rota of todasRotas) {
        let rotaCompleta = [0, ...rota];
        let custo = calcularCustoRota(rotaCompleta, matriz);

        if (custo < menorCusto) {
            menorCusto = custo;
            melhorRota = rotaCompleta;
        }
    }

    return {
        rota: melhorRota,
        custo: menorCusto
    };
}

// -----------------------------------------------------
// TSP POR VIZINHO MAIS PRÓXIMO
// -----------------------------------------------------
function tspVizinhoMaisProximo(matriz, inicio = 0) {
    let n = matriz.length;
    let visitadas = new Array(n).fill(false);
    let rota = [inicio];
    let custoTotal = 0;
    let cidadeAtual = inicio;

    visitadas[inicio] = true;

    for (let contador = 1; contador < n; contador++) {
        let proximaCidade = -1;
        let menorDistancia = Infinity;

        for (let i = 0; i < n; i++) {
            if (!visitadas[i] && matriz[cidadeAtual][i] < menorDistancia) {
                menorDistancia = matriz[cidadeAtual][i];
                proximaCidade = i;
            }
        }

        rota.push(proximaCidade);
        visitadas[proximaCidade] = true;
        custoTotal += menorDistancia;
        cidadeAtual = proximaCidade;
    }

    // volta para a cidade inicial
    custoTotal += matriz[cidadeAtual][inicio];

    return {
        rota: rota,
        custo: custoTotal
    };
}

// -----------------------------------------------------
// FUNÇÃO PARA GERAR MATRIZ DE DISTÂNCIAS ALEATÓRIA
// -----------------------------------------------------
function gerarMatrizDistancias(n) {
    let matriz = [];

    for (let i = 0; i < n; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            matriz[i][j] = 0;
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let distancia = Math.floor(Math.random() * 41) + 10; // de 10 a 50
            matriz[i][j] = distancia;
            matriz[j][i] = distancia;
        }
    }

    return matriz;
}

// -----------------------------------------------------
// FUNÇÃO PARA MOSTRAR A ROTA COM NOMES DAS CIDADES
// -----------------------------------------------------
function formatarRota(rota, nomesCidades) {
    let nomes = rota.map(indice => nomesCidades[indice]);
    nomes.push(nomesCidades[rota[0]]);
    return nomes.join(" -> ");
}

// =====================================================
// TESTE 1 - FORÇA BRUTA COM 5 CIDADES
// =====================================================
const nomes5 = ["A", "B", "C", "D", "E"];

const matriz5 = [
    [0, 10, 15, 20, 25],
    [10, 0, 35, 25, 17],
    [15, 35, 0, 30, 28],
    [20, 25, 30, 0, 16],
    [25, 17, 28, 16, 0]
];

console.log("======================================");
console.log("TESTE 1 - FORÇA BRUTA COM 5 CIDADES");
console.log("======================================");

let resultadoForcaBruta5 = tspForcaBruta(matriz5);

console.log("Melhor rota:");
console.log(formatarRota(resultadoForcaBruta5.rota, nomes5));
console.log("Custo total:", resultadoForcaBruta5.custo);

// =====================================================
// TESTE 2 - VIZINHO MAIS PRÓXIMO COM 10 CIDADES
// =====================================================
const nomes10 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const matriz10 = gerarMatrizDistancias(10);

console.log("\n======================================");
console.log("TESTE 2 - VIZINHO MAIS PRÓXIMO COM 10 CIDADES");
console.log("======================================");

let resultadoVizinho10 = tspVizinhoMaisProximo(matriz10, 0);

console.log("Rota encontrada:");
console.log(formatarRota(resultadoVizinho10.rota, nomes10));
console.log("Custo total:", resultadoVizinho10.custo);

// =====================================================
// TESTE 3 - COMPARAÇÃO ENTRE EXATO E APROXIMADO
// OBS: Para não ficar pesado demais, aqui usei 8 cidades
// porque força bruta com 10 cidades pode demorar bastante
// =====================================================
const nomes8 = ["A", "B", "C", "D", "E", "F", "G", "H"];
const matriz8 = gerarMatrizDistancias(8);

console.log("\n======================================");
console.log("TESTE 3 - COMPARAÇÃO ENTRE OS MÉTODOS");
console.log("======================================");

console.time("Tempo Força Bruta");
let resultadoExato8 = tspForcaBruta(matriz8);
console.timeEnd("Tempo Força Bruta");

console.time("Tempo Vizinho Mais Próximo");
let resultadoVizinho8 = tspVizinhoMaisProximo(matriz8, 0);
console.timeEnd("Tempo Vizinho Mais Próximo");

console.log("\n--- Solução Exata (Força Bruta) ---");
console.log("Rota:", formatarRota(resultadoExato8.rota, nomes8));
console.log("Custo:", resultadoExato8.custo);

console.log("\n--- Solução Aproximada (Vizinho Mais Próximo) ---");
console.log("Rota:", formatarRota(resultadoVizinho8.rota, nomes8));
console.log("Custo:", resultadoVizinho8.custo);

// =====================================================
// EXIBIR MATRIZ USADA NO TESTE 3
// =====================================================
console.log("\nMatriz de distâncias usada no teste 3:");
console.table(matriz8);
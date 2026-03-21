/*1. Implementação Simples: 
○ Implemente o algoritmo de Selection Sort e teste com uma lista de 10 
números inteiros. Calcule o número de comparações e trocas realizadas. 
○ Modifique o Insertion Sort para funcionar com uma lista de strings e 
ordená-las alfabeticamente.*/

// Implementação do Selection Sort
function selectionSort(arr) {
    let comparacoes = 0;
    let trocas = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let menor = i;

        for (let j = i + 1; j < arr.length; j++) {
            comparacoes++;
            if (arr[j] < arr[menor]) {
                menor = j;
            }
        }

        if (menor !== i) {
            // troca
            let temp = arr[i];
            arr[i] = arr[menor];
            arr[menor] = temp;
            trocas++;
        }
    }

    return {
        listaOrdenada: arr,
        comparacoes: comparacoes,
        trocas: trocas
    };
}

// Teste com 10 números
let numeros = [9, 3, 7, 1, 5, 8, 2, 6, 4, 10];

let resultado = selectionSort(numeros);

console.log("Lista ordenada:", resultado.listaOrdenada);
console.log("Comparações:", resultado.comparacoes);
console.log("Trocas:", resultado.trocas);


// Modificação do Insertion Sort para strings
function insertionSortStrings(arr) {
    for (let i = 1; i < arr.length; i++) {
        let atual = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j].localeCompare(atual) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = atual;
    }

    return arr;
}

// Teste com strings
let nomes = ["Carlos", "Ana", "Bruno", "Daniel", "Eduardo"];

let nomesOrdenados = insertionSortStrings(nomes);

console.log("Lista ordenada:", nomesOrdenados);






/*3. Implementação Avançada: 
○ Implemente o Merge Sort e teste com uma lista de 50 números aleatórios. 
Verifique o tempo de execução comparado com o Quick Sort. 
○ Modifique o Quick Sort para selecionar o pivô como o valor mediano de três 
elementos (início, meio e fim) e compare o desempenho com a versão 
original.*/

// Gerar lista aleatória
function gerarListaAleatoria(tamanho) {
    let lista = [];

    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * 1000));
    }

    return lista;
}

// =========================
// MERGE SORT
// =========================
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const meio = Math.floor(arr.length / 2);
    const esquerda = mergeSort(arr.slice(0, meio));
    const direita = mergeSort(arr.slice(meio));

    return merge(esquerda, direita);
}

function merge(esquerda, direita) {
    let resultado = [];
    let i = 0;
    let j = 0;

    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i] < direita[j]) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }

    while (i < esquerda.length) {
        resultado.push(esquerda[i]);
        i++;
    }

    while (j < direita.length) {
        resultado.push(direita[j]);
        j++;
    }

    return resultado;
}

// =========================
// QUICK SORT ORIGINAL
// Pivô = último elemento
// =========================
function quickSortOriginal(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivo = arr[arr.length - 1];
    let menores = [];
    let iguais = [];
    let maiores = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivo) {
            menores.push(arr[i]);
        } else if (arr[i] > pivo) {
            maiores.push(arr[i]);
        } else {
            iguais.push(arr[i]);
        }
    }

    return [
        ...quickSortOriginal(menores),
        ...iguais,
        ...quickSortOriginal(maiores)
    ];
}

// =========================
// QUICK SORT MEDIANA DE TRÊS
// Pivô = mediana entre início, meio e fim
// =========================
function medianaDeTres(a, b, c) {
    if ((a >= b && a <= c) || (a <= b && a >= c)) {
        return a;
    } else if ((b >= a && b <= c) || (b <= a && b >= c)) {
        return b;
    } else {
        return c;
    }
}

function quickSortMediana(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const primeiro = arr[0];
    const meio = arr[Math.floor(arr.length / 2)];
    const ultimo = arr[arr.length - 1];

    const pivo = medianaDeTres(primeiro, meio, ultimo);

    let menores = [];
    let iguais = [];
    let maiores = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivo) {
            menores.push(arr[i]);
        } else if (arr[i] > pivo) {
            maiores.push(arr[i]);
        } else {
            iguais.push(arr[i]);
        }
    }

    return [
        ...quickSortMediana(menores),
        ...iguais,
        ...quickSortMediana(maiores)
    ];
}

// =========================
// TESTE E COMPARAÇÃO
// =========================
const listaOriginal = gerarListaAleatoria(50);

console.log("Lista original:");
console.log(listaOriginal);

// Merge Sort
console.time("Tempo Merge Sort");
const listaMerge = mergeSort([...listaOriginal]);
console.timeEnd("Tempo Merge Sort");

// Quick Sort Original
console.time("Tempo Quick Sort Original");
const listaQuickOriginal = quickSortOriginal([...listaOriginal]);
console.timeEnd("Tempo Quick Sort Original");

// Quick Sort Mediana de Três
console.time("Tempo Quick Sort Mediana de Três");
const listaQuickMediana = quickSortMediana([...listaOriginal]);
console.timeEnd("Tempo Quick Sort Mediana de Três");

console.log("\nLista ordenada com Merge Sort:");
console.log(listaMerge);

console.log("\nLista ordenada com Quick Sort Original:");
console.log(listaQuickOriginal);

console.log("\nLista ordenada com Quick Sort Mediana de Três:");
console.log(listaQuickMediana);
/*4. Comparação entre Algoritmos: 
○ Compare o desempenho de Merge Sort, Quick Sort e Heap Sort com listas 
de 100, 1000 e 10.000 elementos aleatórios. Qual algoritmo apresenta o 
melhor desempenho? 
○ Dado um conjunto de elementos com valores repetidos, implemente os 
algoritmos Quick Sort e Merge Sort e verifique qual preserva a ordem 
relativa dos elementos iguais.*/

//Gerar lista aleatória
function gerarListaAleatoria(tamanho) {
    let lista = [];

    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * 10000));
    }

    return lista;
}

// ==================================================
// MERGE SORT
// ==================================================
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
        if (esquerda[i] <= direita[j]) {
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

// ==================================================
// QUICK SORT
// ==================================================
function quickSort(arr) {
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

    return [...quickSort(menores), ...iguais, ...quickSort(maiores)];
}

// ==================================================
// HEAP SORT
// ==================================================
function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, n, i) {
    let maior = i;
    let esquerda = 2 * i + 1;
    let direita = 2 * i + 2;

    if (esquerda < n && arr[esquerda] > arr[maior]) {
        maior = esquerda;
    }

    if (direita < n && arr[direita] > arr[maior]) {
        maior = direita;
    }

    if (maior !== i) {
        [arr[i], arr[maior]] = [arr[maior], arr[i]];
        heapify(arr, n, maior);
    }
}

// ==================================================
// COMPARAÇÃO DE DESEMPENHO
// ==================================================
function testarDesempenho() {
    const tamanhos = [100, 1000, 10000];

    for (let tamanho of tamanhos) {
        console.log(`\n===== TESTE COM ${tamanho} ELEMENTOS =====`);

        const lista = gerarListaAleatoria(tamanho);

        console.time(`Merge Sort ${tamanho}`);
        mergeSort([...lista]);
        console.timeEnd(`Merge Sort ${tamanho}`);

        console.time(`Quick Sort ${tamanho}`);
        quickSort([...lista]);
        console.timeEnd(`Quick Sort ${tamanho}`);

        console.time(`Heap Sort ${tamanho}`);
        heapSort([...lista]);
        console.timeEnd(`Heap Sort ${tamanho}`);
    }
}

// ==================================================
// TESTE DE ESTABILIDADE
// ==================================================
// Cada objeto tem:
// valor -> usado para ordenar
// id -> mostra a posição original
const listaRepetidos = [
    { valor: 5, id: "A" },
    { valor: 3, id: "B" },
    { valor: 5, id: "C" },
    { valor: 2, id: "D" },
    { valor: 3, id: "E" },
    { valor: 5, id: "F" }
];

// --------------------------------------------------
// MERGE SORT ESTÁVEL PARA OBJETOS
// --------------------------------------------------
function mergeSortObjetos(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const meio = Math.floor(arr.length / 2);
    const esquerda = mergeSortObjetos(arr.slice(0, meio));
    const direita = mergeSortObjetos(arr.slice(meio));

    return mergeObjetos(esquerda, direita);
}

function mergeObjetos(esquerda, direita) {
    let resultado = [];
    let i = 0;
    let j = 0;

    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i].valor <= direita[j].valor) {
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

// --------------------------------------------------
// QUICK SORT PARA OBJETOS
// --------------------------------------------------
function quickSortObjetos(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivo = arr[arr.length - 1];
    let menores = [];
    let iguais = [];
    let maiores = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].valor < pivo.valor) {
            menores.push(arr[i]);
        } else if (arr[i].valor > pivo.valor) {
            maiores.push(arr[i]);
        } else {
            iguais.push(arr[i]);
        }
    }
    
    return [
        ...quickSortObjetos(menores),
        ...iguais,
        ...quickSortObjetos(maiores)
    ];
}

// ==================================================
// EXECUÇÃO
// ==================================================
testarDesempenho();

console.log("\n===== TESTE DE ESTABILIDADE =====");
console.log("Lista original:");
console.log(listaRepetidos);

const resultadoMerge = mergeSortObjetos([...listaRepetidos]);
console.log("\nMerge Sort:");
console.log(resultadoMerge);

const resultadoQuick = quickSortObjetos([...listaRepetidos]);
console.log("\nQuick Sort:");
console.log(resultadoQuick);

// Mostrando apenas os IDs para facilitar a visualização
console.log("\nOrdem dos IDs no Merge Sort:");
console.log(resultadoMerge.map(item => `${item.valor}-${item.id}`));

console.log("\nOrdem dos IDs no Quick Sort:");
console.log(resultadoQuick.map(item => `${item.valor}-${item.id}`));
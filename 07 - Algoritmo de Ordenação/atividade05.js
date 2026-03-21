/*5. Desafio de Estabilidade: 
○ Implemente uma versão do Heap Sort que garanta a estabilidade da 
ordenação (mesmo que naturalmente não seja estável). 
○ Implemente o Selection Sort de forma que ele se torne um algoritmo 
estável.*/

// ==========================================
// LISTA DE TESTE COM VALORES REPETIDOS
// ==========================================
const listaOriginal = [
    { valor: 4, id: "A" },
    { valor: 2, id: "B" },
    { valor: 4, id: "C" },
    { valor: 1, id: "D" },
    { valor: 2, id: "E" },
    { valor: 4, id: "F" }
];

console.log("Lista original:");
console.log(listaOriginal);
console.log("Ordem original:", listaOriginal.map(item => `${item.valor}-${item.id}`));

// ==========================================
// 1) HEAP SORT ESTÁVEL
// Ideia:
// comparar primeiro pelo valor
// se os valores forem iguais, comparar pelo índice original
// ==========================================
function heapSortEstavel(arr) {
    // Adiciona o índice original em cada elemento
    let lista = arr.map((item, indice) => ({
        valor: item.valor,
        id: item.id,
        indiceOriginal: indice
    }));

    let n = lista.length;

    // Monta o heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyEstavel(lista, n, i);
    }

    // Extrai elementos do heap
    for (let i = n - 1; i > 0; i--) {
        [lista[0], lista[i]] = [lista[i], lista[0]];
        heapifyEstavel(lista, i, 0);
    }

    // Remove o campo auxiliar antes de retornar
    return lista.map(item => ({
        valor: item.valor,
        id: item.id
    }));
}

function heapifyEstavel(arr, n, i) {
    let maior = i;
    let esquerda = 2 * i + 1;
    let direita = 2 * i + 2;

    if (esquerda < n && compararHeap(arr[esquerda], arr[maior]) > 0) {
        maior = esquerda;
    }

    if (direita < n && compararHeap(arr[direita], arr[maior]) > 0) {
        maior = direita;
    }

    if (maior !== i) {
        [arr[i], arr[maior]] = [arr[maior], arr[i]];
        heapifyEstavel(arr, n, maior);
    }
}

// Função de comparação para manter estabilidade
function compararHeap(a, b) {
    if (a.valor > b.valor) return 1;
    if (a.valor < b.valor) return -1;

    // Se os valores forem iguais,
    // quem apareceu depois é considerado maior no heap
    // para que, ao final, quem apareceu antes fique primeiro
    if (a.indiceOriginal > b.indiceOriginal) return 1;
    if (a.indiceOriginal < b.indiceOriginal) return -1;

    return 0;
}

// ==========================================
// 2) SELECTION SORT ESTÁVEL
// Ideia:
// em vez de trocar diretamente,
// guarda o menor elemento e desloca os outros para a direita
// ==========================================
function selectionSortEstavel(arr) {
    let lista = [...arr];

    for (let i = 0; i < lista.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < lista.length; j++) {
            if (lista[j].valor < lista[minIndex].valor) {
                minIndex = j;
            }
        }

        // Guarda o menor elemento
        let chave = lista[minIndex];

        // Desloca os elementos para a direita
        while (minIndex > i) {
            lista[minIndex] = lista[minIndex - 1];
            minIndex--;
        }

        // Coloca o menor elemento na posição correta
        lista[i] = chave;
    }

    return lista;
}

// ==========================================
// TESTES
// ==========================================
const resultadoHeapEstavel = heapSortEstavel(listaOriginal);
const resultadoSelectionEstavel = selectionSortEstavel(listaOriginal);

console.log("\nHeap Sort Estável:");
console.log(resultadoHeapEstavel);
console.log("Ordem:", resultadoHeapEstavel.map(item => `${item.valor}-${item.id}`));

console.log("\nSelection Sort Estável:");
console.log(resultadoSelectionEstavel);
console.log("Ordem:", resultadoSelectionEstavel.map(item => `${item.valor}-${item.id}`));
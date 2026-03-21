/*2. Análise de Complexidade: 
○ Calcule a complexidade de tempo para o Bubble Sort ao ordenar uma lista 
de 100 elementos. Como a complexidade muda quando a lista já está 
ordenada? 
○ Compare o número de comparações realizadas pelo Selection Sort e pelo 
Insertion Sort em uma lista de 10 elementos.*/

// Gerar lista aleatória
function gerarLista(tamanho) {
    let lista = [];
    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * 1000));
    }
    return lista;
}

// ==========================================
// BUBBLE SORT COM CONTAGEM
// ==========================================
function bubbleSort(arr) {
    let comparacoes = 0;
    let trocas = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let trocou = false;

        for (let j = 0; j < arr.length - 1 - i; j++) {
            comparacoes++;

            if (arr[j] > arr[j + 1]) {
                // troca
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                trocas++;
                trocou = true;
            }
        }

        // otimização: para se já estiver ordenado
        if (!trocou) break;
    }

    return { arr, comparacoes, trocas };
}

// ==========================================
// SELECTION SORT COM CONTAGEM
// ==========================================
function selectionSort(arr) {
    let comparacoes = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let menor = i;

        for (let j = i + 1; j < arr.length; j++) {
            comparacoes++;
            if (arr[j] < arr[menor]) {
                menor = j;
            }
        }

        if (menor !== i) {
            [arr[i], arr[menor]] = [arr[menor], arr[i]];
        }
    }

    return comparacoes;
}

// ==========================================
// INSERTION SORT COM CONTAGEM
// ==========================================
function insertionSort(arr) {
    let comparacoes = 0;

    for (let i = 1; i < arr.length; i++) {
        let atual = arr[i];
        let j = i - 1;

        while (j >= 0) {
            comparacoes++;

            if (arr[j] > atual) {
                arr[j + 1] = arr[j];
                j--;
            } else {
                break;
            }
        }

        arr[j + 1] = atual;
    }

    return comparacoes;
}

// ==========================================
// TESTE 1: BUBBLE SORT (100 ELEMENTOS)
// ==========================================
let lista100 = gerarLista(100);

let resultadoBubble = bubbleSort([...lista100]);

console.log("===== BUBBLE SORT (100 elementos) =====");
console.log("Comparações:", resultadoBubble.comparacoes);
console.log("Trocas:", resultadoBubble.trocas);

// ==========================================
// TESTE 2: COMPARAÇÃO (10 ELEMENTOS)
// ==========================================
let lista10 = gerarLista(10);

let compSelection = selectionSort([...lista10]);
let compInsertion = insertionSort([...lista10]);

console.log("\n===== COMPARAÇÃO (10 elementos) =====");
console.log("Selection Sort - Comparações:", compSelection);
console.log("Insertion Sort - Comparações:", compInsertion);
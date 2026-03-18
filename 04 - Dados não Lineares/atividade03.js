/*3. Heaps: 
○ Implemente um max-heap e escreva funções para inserir um novo elemento 
e remover o maior elemento. 
○ Use um heap para implementar uma fila de prioridades que sempre retorna o 
maior valor.*/

//===========
//  Max-Heap
//============
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Retorna o índice do pai
    getPai(index) {
        return Math.floor((index - 1) / 2);
    }

    // Retorna o índice do filho esquerdo
    getEsquerda(index) {
        return 2 * index + 1;
    }

    // Retorna o índice do filho direito
    getDireita(index) {
        return 2 * index + 2;
    }

    // Troca dois elementos de posição
    trocar(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Inserir novo elemento
    inserir(valor) {
        this.heap.push(valor);
        this.subir(this.heap.length - 1);
    }

    // Ajusta de baixo para cima
    subir(index) {
        while (
            index > 0 &&
            this.heap[this.getPai(index)] < this.heap[index]
        ) {
            let pai = this.getPai(index);
            this.trocar(index, pai);
            index = pai;
        }
    }

    // Remover o maior elemento
    removerMaior() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        let maior = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.descer(0);

        return maior;
    }

    // Ajusta de cima para baixo
    descer(index) {
        let maior = index;
        let esquerda = this.getEsquerda(index);
        let direita = this.getDireita(index);

        if (
            esquerda < this.heap.length &&
            this.heap[esquerda] > this.heap[maior]
        ) {
            maior = esquerda;
        }

        if (
            direita < this.heap.length &&
            this.heap[direita] > this.heap[maior]
        ) {
            maior = direita;
        }

        if (maior !== index) {
            this.trocar(index, maior);
            this.descer(maior);
        }
    }

    // Retorna o maior valor sem remover
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    // Exibe o heap
    imprimir() {
        console.log(this.heap);
    }
}

// Testando o Max-Heap
let heap = new MaxHeap();

heap.inserir(10);
heap.inserir(30);
heap.inserir(20);
heap.inserir(5);
heap.inserir(40);

console.log("Heap após inserções:");
heap.imprimir();

console.log("Maior valor:", heap.peek());

console.log("Removido:", heap.removerMaior());
console.log("Heap após remover o maior:");
heap.imprimir();

console.log("Removido:", heap.removerMaior());
console.log("Heap após remover o maior novamente:");
heap.imprimir();


// ===================================
// Fila de Prioridades usando Max-Heap
// ===================================

class FilaPrioridade {
    constructor() {
        this.heap = new MaxHeap();
    }

    enfileirar(valor) {
        this.heap.inserir(valor);
    }

    desenfileirar() {
        return this.heap.removerMaior();
    }

    frente() {
        return this.heap.peek();
    }

    imprimir() {
        this.heap.imprimir();
    }
}

// Testando a fila de prioridades
let fila = new FilaPrioridade();

fila.enfileirar(15);
fila.enfileirar(50);
fila.enfileirar(25);
fila.enfileirar(40);

console.log("Fila de prioridades:");
fila.imprimir();

console.log("Maior prioridade:", fila.frente());
console.log("Atendido:", fila.desenfileirar());
console.log("Fila após atender:");
fila.imprimir();
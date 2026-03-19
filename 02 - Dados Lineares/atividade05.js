/*5. Fila (Queue): 
○ Crie uma fila e implemente as operações de enqueue e dequeue. 
○ Modifique o código para implementar uma fila circular. 
○ Desenvolva um programa que simule o atendimento de um banco utilizando 
uma fila simples.*/

// FILA SIMPLES
class Fila {
    constructor() {
        this.itens = [];
    }
    // Adiciona um elemento ao final da fila
    enqueue(elemento) {
        this.itens.push(elemento);
        return `${elemento} entrou na fila.`;
    }
    // Remove o elemento do início da fila
    dequeue() {
        if (this.estaVazia()) {
            return "A fila está vazia.";
        }

        return this.itens.shift();
    }
    // Verifica se a fila está vazia
    estaVazia() {
        return this.itens.length === 0;
    }
    // Retorna o elemento do início da fila sem removê-lo
    frente() {
        if (this.estaVazia()) {
            return "A fila está vazia.";
        }

        return this.itens[0];
    }
    // Exibe os elementos da fila
    exibir() {
        console.log(this.itens);
    }
}

// FILA CIRCULAR
class FilaCircular {
    constructor(tamanho) {
        this.itens = new Array(tamanho);
        this.tamanho = tamanho;
        this.inicio = 0;
        this.fim = 0;
        this.quantidade = 0;
    }
    // Verifica se a fila circular está vazia
    estaVazia() {
        return this.quantidade === 0;
    }
    // Verifica se a fila circular está cheia
    estaCheia() {
        return this.quantidade === this.tamanho;
    }
    // Adiciona um elemento ao final da fila circular
    enqueue(elemento) {
        if (this.estaCheia()) {
            return "Fila circular cheia.";
        }

        this.itens[this.fim] = elemento;
        this.fim = (this.fim + 1) % this.tamanho;
        this.quantidade++;

        return `${elemento} entrou na fila circular.`;
    }
    // Remove o elemento do início da fila circular
    dequeue() {
        if (this.estaVazia()) {
            return "Fila circular vazia.";
        }

        const removido = this.itens[this.inicio];
        this.itens[this.inicio] = null;
        this.inicio = (this.inicio + 1) % this.tamanho;
        this.quantidade--;

        return removido;
    }
    // Retorna o elemento do início da fila circular sem removê-lo
    frente() {
        if (this.estaVazia()) {
            return "Fila circular vazia.";
        }

        return this.itens[this.inicio];
    }
    // Exibe os elementos da fila circular
    exibir() {
        console.log(this.itens);
    }
}

// SIMULAÇÃO DE BANCO
class FilaBanco {
    constructor() {
        this.clientes = [];
    }
    // Adiciona um cliente à fila do banco
    entrarNaFila(nome) {
        this.clientes.push(nome);
        console.log(`${nome} entrou na fila do banco.`);
    }
    // Atende o cliente no início da fila do banco
    atenderCliente() {
        if (this.clientes.length === 0) {
            console.log("Nenhum cliente na fila.");
            return;
        }

        const clienteAtendido = this.clientes.shift();
        console.log(`${clienteAtendido} foi atendido.`);
    }
    // Mostra os clientes na fila do banco
    mostrarFila() {
        if (this.clientes.length === 0) {
            console.log("A fila do banco está vazia.");
        } else {
            console.log("Fila do banco:", this.clientes);
        }
    }
}

// TESTE FILA SIMPLES
const fila = new Fila();
console.log(fila.enqueue("Ana"));
console.log(fila.enqueue("Bruno"));
console.log(fila.enqueue("Carlos"));
fila.exibir();
console.log("Saiu:", fila.dequeue());
fila.exibir();

// TESTE FILA CIRCULAR
const filaCircular = new FilaCircular(5);
console.log(filaCircular.enqueue("A"));
console.log(filaCircular.enqueue("B"));
console.log(filaCircular.enqueue("C"));
filaCircular.exibir();
console.log("Saiu:", filaCircular.dequeue());
filaCircular.exibir();

// TESTE BANCO
const banco = new FilaBanco();
banco.entrarNaFila("João");
banco.entrarNaFila("Maria");
banco.entrarNaFila("Carlos");
banco.mostrarFila();
banco.atenderCliente();
banco.mostrarFila();
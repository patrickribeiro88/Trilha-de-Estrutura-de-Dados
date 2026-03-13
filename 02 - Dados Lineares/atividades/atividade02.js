/* 2. Lista Simplesmente Encadeada:
○ Implemente uma lista simplesmente encadeada com as seguintes operações:inserir no início, inserir no final e remover de uma posição específica.
○ Modifique o código anterior para permitir a busca de um elemento por valor.*/

// Classe do Nó
class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}
// Classe da Lista 
class ListaEncadeada {
    constructor() {
        this.inicio = null;
        this.tamanho = 0;
    }
    // Inserir no início
    inserirNoInicio(valor) {
        const novoNo = new No(valor);
        novoNo.proximo = this.inicio;
        this.inicio = novoNo;
        this.tamanho++;
    }
    // Inserir no final
    inserirNoFinal(valor) {
        const novoNo = new No(valor);
        if (this.inicio === null) {
            this.inicio = novoNo;
        } else {
            let atual = this.inicio;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
        this.tamanho++;
    }
    // Remover de uma posição específica
    remover(posicao) {
        if (posicao < 0 || posicao >= this.tamanho) {
            return "Posição inválida.";
        }
        if (posicao ===0) {
            this.inicio = this.inicio.proximo;
        } else {
            let atual = this.inicio;
            let anterior = null;
            let indice = 0;

            while (indice < posicao) {
                anterior = atual;
                atual = atual.proximo;
                indice++;
            }
            anterior.proximo = atual.proximo;
        }
        this.tamanho--;
        return "Elemento removido com seucesso";
    }
    // Buscar um elemento por valor
    buscar(valor) {
        let atual = this.inicio;
        let posicao = 0;

        while (atual !== null) {
            if (atual.valor === valor) {
                return "Elemento encontrado na posição: " + posicao;
            }
            atual = atual.proximo;
            posicao++;
        }
        return "Elemento não encontrado.";
    }
    // Exibir a lista
    exibir() {
        let atual = this.inicio;
        let resultado = "";

        while (atual !== null) {
            resultado += atual.valor + " -> ";
            atual = atual.proximo;
        }
        console.log(resultado + "null");
    }
}
// Testando a lista encadeada
const lista = new ListaEncadeada();

lista.inserirNoInicio(10);
lista.inserirNoInicio(5);
lista.inserirNoFinal(20);
lista.inserirNoFinal(30);

lista.exibir(); // Exibe a lista

console.log(lista.buscar(20)); 
console.log(lista.remover(1)); 

lista.exibir(); // Exibe a lista após a remoção


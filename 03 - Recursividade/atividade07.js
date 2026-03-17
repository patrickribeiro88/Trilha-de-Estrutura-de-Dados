/*7. Contagem de Nós em uma Lista Encadeada: 
○ Implemente uma função recursiva que conte o número de nós em uma lista 
encadeada. 
○ Analise o desempenho do algoritmo em termos de complexidade de tempo e 
espaço.*/

// Estrutura do nó
function Node(valor) {
    this.valor = valor;
    this.next = null;
}

// Função recursiva para contar nós
function contarNos(node) {

    // Caso base: fim da lista
    if (node === null) {
        return 0;
    }

    // Conta 1 (nó atual) + resto da lista
    return 1 + contarNos(node.next);
}


// Criando uma lista de exemplo
let n1 = new Node(10);
let n2 = new Node(20);
let n3 = new Node(30);
let n4 = new Node(40);

n1.next = n2;
n2.next = n3;
n3.next = n4;


// Testando
console.log("Quantidade de nós:", contarNos(n1));
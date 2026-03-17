/*4. Soma dos Elementos de uma Lista Encadeada: 
○ Crie uma função recursiva que percorra uma lista simplesmente encadeada e 
retorne a soma de todos os elementos da lista.*/

// Estrutura do nó da lista encadeada
function Node(valor) {
    this.valor = valor;
    this.next = null;
}
// Função recursiva para somar os elementos da lista
function somaLista(node) {
    if (node === null) {
        return 0;
    }
    // Soma o valor do nó atual com a soma dos próximos nós
    return node.valor + somaLista(node.next);
}
// Exemplo de uso
let n1 = new Node(10);
let n2 = new Node(20);
let n3 = new Node(30);
let n4 = new Node(40);

// Conectando os nós
n1.next = n2;
n2.next = n3;
n3.next = n4;

console.log("Soma da lista:", somaLista(n1));
/*5. Busca em uma Árvore Binária de Busca: 
○ Implemente uma função recursiva para buscar um valor em uma árvore 
binária de busca. 
○ Qual é a complexidade de tempo da busca em termos de nnn, onde nnn é o 
número de nós na árvore? */

// Estrutura do nó da árvore
function Node(valor) {
    this.valor = valor;
    this.left = null;
    this.right = null;
}

// Função recursiva de busca
function buscar(node, valor) {

    // Caso base: não encontrou
    if (node === null) {
        return false;
    }

    // Valor encontrado
    if (node.valor === valor) {
        return true;
    }

    // Se o valor for menor, busca na esquerda
    if (valor < node.valor) {
        return buscar(node.left, valor);
    }

    // Se for maior, busca na direita
    return buscar(node.right, valor);
}


// Criando a árvore binária de busca
let raiz = new Node(8);

raiz.left = new Node(3);
raiz.right = new Node(10);

raiz.left.left = new Node(1);
raiz.left.right = new Node(6);

raiz.right.right = new Node(14);


// Testando a busca
console.log("Buscar 6:", buscar(raiz, 6));
console.log("Buscar 14:", buscar(raiz, 14));
console.log("Buscar 7:", buscar(raiz, 7));
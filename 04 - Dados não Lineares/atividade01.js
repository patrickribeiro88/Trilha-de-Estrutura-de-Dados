/*1. Árvores Binárias: 
○ Implemente uma árvore binária e crie as funções para realizar os percursos 
in-order, pre-order e post-order. 
○ Dado um conjunto de números, construa uma árvore binária de busca (BST) 
e implemente funções para inserir, buscar e remover elementos da árvore.*/


// Estrutura do nó da árvore
function Node(valor) {
    this.valor = valor;
    this.left = null;
    this.right = null;
}

// ==========================
// Percursos da árvore
// ==========================

// In-Order: esquerda -> raiz -> direita
function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.valor);
        inOrder(node.right);
    }
}

// Pre-Order: raiz -> esquerda -> direita
function preOrder(node) {
    if (node !== null) {
        console.log(node.valor);
        preOrder(node.left);
        preOrder(node.right);
    }
}

// Post-Order: esquerda -> direita -> raiz
function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.valor);
    }
}

// ==========================
// Funções da BST
// ==========================

// Inserir elemento na BST
function inserir(node, valor) {
    if (node === null) {
        return new Node(valor);
    }

    if (valor < node.valor) {
        node.left = inserir(node.left, valor);
    } else if (valor > node.valor) {
        node.right = inserir(node.right, valor);
    }

    return node;
}

// Buscar elemento na BST
function buscar(node, valor) {
    if (node === null) {
        return false;
    }

    if (node.valor === valor) {
        return true;
    }

    if (valor < node.valor) {
        return buscar(node.left, valor);
    }

    return buscar(node.right, valor);
}

// Encontrar o menor valor da subárvore
function menorValor(node) {
    let atual = node;

    while (atual.left !== null) {
        atual = atual.left;
    }

    return atual.valor;
}

// Remover elemento da BST
function remover(node, valor) {
    if (node === null) {
        return null;
    }

    if (valor < node.valor) {
        node.left = remover(node.left, valor);
    } else if (valor > node.valor) {
        node.right = remover(node.right, valor);
    } else {
        // Caso 1: nó sem filhos
        if (node.left === null && node.right === null) {
            return null;
        }

        // Caso 2: nó com apenas um filho
        if (node.left === null) {
            return node.right;
        }

        if (node.right === null) {
            return node.left;
        }

        // Caso 3: nó com dois filhos
        let sucessor = menorValor(node.right);
        node.valor = sucessor;
        node.right = remover(node.right, sucessor);
    }

    return node;
}

// Montando a BST
let raiz = null;

let numeros = [8, 3, 10, 1, 6, 14, 4, 7, 13];

for (let i = 0; i < numeros.length; i++) {
    raiz = inserir(raiz, numeros[i]);
}

// Testando percursos
console.log("In-Order:");
inOrder(raiz);

console.log("Pre-Order:");
preOrder(raiz);

console.log("Post-Order:");
postOrder(raiz);

// Testando busca
console.log("Buscar 6:", buscar(raiz, 6));
console.log("Buscar 15:", buscar(raiz, 15));

// Testando remoção
console.log("Removendo 10...");
raiz = remover(raiz, 10);

console.log("In-Order após remover 10:");
inOrder(raiz);
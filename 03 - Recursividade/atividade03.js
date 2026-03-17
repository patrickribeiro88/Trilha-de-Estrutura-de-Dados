/*3. Travessia em Árvores: 
○ Implemente um algoritmo recursivo para realizar o percurso in-order de uma 
árvore binária. 
○ Altere o código para implementar os percursos pre-order e post-order.*/ 

// Estrutura do nó da árvore
function Node(valor) {
    this.valor = valor;
    this.left = null;
    this.right = null;
}

// Criando a árvore
let raiz = new Node(4);
raiz.left = new Node(2);
raiz.right = new Node(6);
raiz.left.left = new Node(1);
raiz.left.right = new Node(3);
raiz.right.left = new Node(5);
raiz.right.right = new Node(7);

// Percurso In-Order
function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.valor);
        inOrder(node.right);
    }
}

// Percurso Pre-Order
function preOrder(node) {
    if (node !== null) {
        console.log(node.valor);
        preOrder(node.left);
        preOrder(node.right);
    }
}

// Percurso Post-Order
function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.valor);
    }
}

// Executando os percursos
console.log("Percurso In-Order:");
inOrder(raiz);

console.log("Percurso Pre-Order:");
preOrder(raiz);

console.log("Percurso Post-Order:");
postOrder(raiz);
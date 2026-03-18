/*2. Árvores AVL: 
○ Implemente uma árvore AVL com as operações de inserção e remoção, 
garantindo que a árvore permaneça balanceada após cada operação.*/ 


// Estrutura do nó da AVL
function Node(valor) {
    this.valor = valor;
    this.left = null;
    this.right = null;
    this.altura = 1;
}

// ==========================
// Funções auxiliares
// ==========================

// Retorna a altura do nó
function altura(node) {
    if (node === null) {
        return 0;
    }
    return node.altura;
}

// Retorna o maior entre dois valores
function max(a, b) {
    return a > b ? a : b;
}

// Atualiza a altura do nó
function atualizarAltura(node) {
    node.altura = 1 + max(altura(node.left), altura(node.right));
}

// Calcula o fator de balanceamento
function fatorBalanceamento(node) {
    if (node === null) {
        return 0;
    }
    return altura(node.left) - altura(node.right);
}

// ==========================
// Rotações
// ==========================

// Rotação à direita
function rotacaoDireita(y) {
    let x = y.left;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    atualizarAltura(y);
    atualizarAltura(x);

    return x;
}

// Rotação à esquerda
function rotacaoEsquerda(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    atualizarAltura(x);
    atualizarAltura(y);

    return y;
}


// Inserção na AVL
function inserir(node, valor) {
    // Inserção normal de BST
    if (node === null) {
        return new Node(valor);
    }

    if (valor < node.valor) {
        node.left = inserir(node.left, valor);
    } else if (valor > node.valor) {
        node.right = inserir(node.right, valor);
    } else {
        return node; // não permite duplicados
    }

    // Atualiza altura
    atualizarAltura(node);

    // Calcula balanceamento
    let balance = fatorBalanceamento(node);

    // Caso Esquerda-Esquerda
    if (balance > 1 && valor < node.left.valor) {
        return rotacaoDireita(node);
    }

    // Caso Direita-Direita
    if (balance < -1 && valor > node.right.valor) {
        return rotacaoEsquerda(node);
    }

    // Caso Esquerda-Direita
    if (balance > 1 && valor > node.left.valor) {
        node.left = rotacaoEsquerda(node.left);
        return rotacaoDireita(node);
    }

    // Caso Direita-Esquerda
    if (balance < -1 && valor < node.right.valor) {
        node.right = rotacaoDireita(node.right);
        return rotacaoEsquerda(node);
    }

    return node;
}

// Menor valor da subárvore
function menorValor(node) {
    let atual = node;
    while (atual.left !== null) {
        atual = atual.left;
    }
    return atual;
}


// Remoção na AVL
function remover(node, valor) {
    // Remoção normal de BST
    if (node === null) {
        return node;
    }

    if (valor < node.valor) {
        node.left = remover(node.left, valor);
    } else if (valor > node.valor) {
        node.right = remover(node.right, valor);
    } else {
        // Nó com um filho ou nenhum
        if (node.left === null || node.right === null) {
            let temp;

            if (node.left !== null) {
                temp = node.left;
            } else {
                temp = node.right;
            }

            if (temp === null) {
                node = null;
            } else {
                node = temp;
            }
        } else {
            // Nó com dois filhos
            let temp = menorValor(node.right);
            node.valor = temp.valor;
            node.right = remover(node.right, temp.valor);
        }
    }

    // Se a árvore ficou vazia
    if (node === null) {
        return node;
    }

    // Atualiza altura
    atualizarAltura(node);

    // Calcula balanceamento
    let balance = fatorBalanceamento(node);

    // Caso Esquerda-Esquerda
    if (balance > 1 && fatorBalanceamento(node.left) >= 0) {
        return rotacaoDireita(node);
    }

    // Caso Esquerda-Direita
    if (balance > 1 && fatorBalanceamento(node.left) < 0) {
        node.left = rotacaoEsquerda(node.left);
        return rotacaoDireita(node);
    }

    // Caso Direita-Direita
    if (balance < -1 && fatorBalanceamento(node.right) <= 0) {
        return rotacaoEsquerda(node);
    }

    // Caso Direita-Esquerda
    if (balance < -1 && fatorBalanceamento(node.right) > 0) {
        node.right = rotacaoDireita(node.right);
        return rotacaoEsquerda(node);
    }

    return node;
}

// Percurso In-Order
function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.valor);
        inOrder(node.right);
    }
}

// Testando a AVL
let raiz = null;

let valores = [30, 20, 40, 10, 25, 35, 50, 5];

for (let i = 0; i < valores.length; i++) {
    raiz = inserir(raiz, valores[i]);
}

console.log("In-Order da árvore AVL:");
inOrder(raiz);

console.log("Removendo 40...");
raiz = remover(raiz, 40);

console.log("In-Order após remover 40:");
inOrder(raiz);
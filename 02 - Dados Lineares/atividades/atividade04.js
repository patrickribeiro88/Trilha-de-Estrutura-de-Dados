/*4. Pilha (Stack): 
○ Implemente uma pilha e adicione operações para verificar se a pilha está cheia ou vazia. 
○ Utilize uma pilha para verificar se uma expressão aritmética contém 
parênteses balanceados (exemplo: ((1+2) * (3/4))).*/

// Classe da Pilha
class Pilha {
    constructor(tamanhoMaximo) {
        this.itens = [];
        this.tamanhoMaximo = tamanhoMaximo;
    }
    // Verificar se a pilha está vazia
    estaVazia() {
        return this.itens.length === 0;
    }
    // Verificar se a pilha está cheia
    estaCheia() {
        return this.itens.length === this.tamanhoMaximo;
    }
    // Empilhar um elemento
    empilhar(elemento) {
        if (this.estaCheia()) {
            return "A pilha está cheia.";
        }

        this.itens.push(elemento);
        return `Elemento ${elemento} adicionado à pilha.`;
    }
    // Desempilhar um elemento
    desempilhar() {
        if (this.estaVazia()) {
            return "A pilha está vazia.";
        }

        return this.itens.pop();
    }
    // Ver o elemento no topo da pilha
    topo() {
        if (this.estaVazia()) {
            return "A pilha está vazia.";
        }

        return this.itens[this.itens.length - 1];
    }
    // Exibir os elementos da pilha
    exibir() {
        console.log(this.itens);
    }
}
// Função para verificar parênteses balanceados
function parentesesBalanceados(expressao) {
    const pilha = new Pilha(expressao.length);

    for (let i = 0; i < expressao.length; i++) {
        let caractere = expressao[i];

        if (caractere === "(") {
            pilha.empilhar(caractere);
        } else if (caractere === ")") {
            if (pilha.estaVazia()) {
                return "A expressão NÃO está balanceada.";
            }
            pilha.desempilhar();
        }
    }

    if (pilha.estaVazia()) {
        return "A expressão está balanceada.";
    } else {
        return "A expressão NÃO está balanceada.";
    }
}

// Testes da pilha
const pilha = new Pilha(3);

console.log(pilha.estaVazia()); // true
console.log(pilha.empilhar(10));
console.log(pilha.empilhar(20));
console.log(pilha.empilhar(30));
console.log(pilha.estaCheia()); // true
pilha.exibir();

console.log(pilha.desempilhar()); // 30
pilha.exibir();

// Testes da expressão
console.log(parentesesBalanceados("((1+2) * (3/4))"));
console.log(parentesesBalanceados("((1+2) * (3/4)"));
console.log(parentesesBalanceados("(1+2))"));
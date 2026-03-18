/*4. Comparação de Técnicas de Tratamento de Colisões: 
○ Implemente tanto o encadeamento quanto o endereçamento aberto e 
compare o desempenho de ambas as técnicas em um conjunto de 1000 
inserções e buscas. 
○ Utilize uma função de hash simples e um load factor de 0.75. Qual das 
abordagens apresenta melhor desempenho?*/

// ======================================
// TABELA HASH COM ENCADEAMENTO
// ======================================

// Classe para a tabela hash com encadeamento
class HashEncadeamento {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }
    // Função hash simples para números
    hash(chave) {
        return chave % this.tamanho;
    }
    // Inserir elemento
    inserir(chave, valor) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].chave === chave) {
                lista[i].valor = valor;
                return;
            }
        }

        lista.push({ chave, valor });
    }
    // Buscar elemento
    buscar(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].chave === chave) {
                return lista[i].valor;
            }
        }

        return null;
    }
}

// ======================================
// TABELA HASH COM PROBING LINEAR
// ======================================

//classe para a tabela hash com probing linear.
class HashProbingLinear {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null);
    }

    hash(chave) {
        return chave % this.tamanho;
    }

    inserir(chave, valor) {
        let indice = this.hash(chave);
        let inicio = indice;

        do {
            if (this.tabela[indice] === null || this.tabela[indice].chave === chave) {
                this.tabela[indice] = { chave, valor };
                return true;
            }

            indice = (indice + 1) % this.tamanho;
        } while (indice !== inicio);

        return false;
    }

    buscar(chave) {
        let indice = this.hash(chave);
        let inicio = indice;

        do {
            if (this.tabela[indice] === null) {
                return null;
            }

            if (this.tabela[indice].chave === chave) {
                return this.tabela[indice].valor;
            }

            indice = (indice + 1) % this.tamanho;
        } while (indice !== inicio);

        return null;
    }
}

// ======================================
// TESTE DE DESEMPENHO
// ======================================
const quantidade = 1000;
const loadFactor = 0.75;
const tamanhoTabela = Math.ceil(quantidade / loadFactor);

const encadeamento = new HashEncadeamento(tamanhoTabela);
const probing = new HashProbingLinear(tamanhoTabela);

// Gerando 1000 chaves
let chaves = [];
for (let i = 0; i < quantidade; i++) {
    chaves.push(i * 7 + 3); // sequência para gerar valores diferentes
}

// ------------------------------
// Inserções - Encadeamento
// ------------------------------
let inicio1 = performance.now();

for (let i = 0; i < quantidade; i++) {
    encadeamento.inserir(chaves[i], "Valor " + chaves[i]);
}

let fim1 = performance.now();

// ------------------------------
// Inserções - Probing Linear
// ------------------------------
let inicio2 = performance.now();

for (let i = 0; i < quantidade; i++) {
    probing.inserir(chaves[i], "Valor " + chaves[i]);
}

let fim2 = performance.now();

// ------------------------------
// Buscas - Encadeamento
// ------------------------------
let inicio3 = performance.now();

for (let i = 0; i < quantidade; i++) {
    encadeamento.buscar(chaves[i]);
}

let fim3 = performance.now();

// ------------------------------
// Buscas - Probing Linear
// ------------------------------
let inicio4 = performance.now();

for (let i = 0; i < quantidade; i++) {
    probing.buscar(chaves[i]);
}

let fim4 = performance.now();

console.log("Tamanho da tabela:", tamanhoTabela);
console.log("Load factor:", loadFactor);

console.log("Encadeamento - Inserção:", (fim1 - inicio1).toFixed(4), "ms");
console.log("Probing Linear - Inserção:", (fim2 - inicio2).toFixed(4), "ms");

console.log("Encadeamento - Busca:", (fim3 - inicio3).toFixed(4), "ms");
console.log("Probing Linear - Busca:", (fim4 - inicio4).toFixed(4), "ms");
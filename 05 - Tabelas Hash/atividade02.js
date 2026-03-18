/*2. Encadeamento: 
○ Implemente uma tabela hash com encadeamento, onde cada índice da 
tabela armazena uma lista encadeada de pares (chave, valor). 
○ Crie as funções para inserir, buscar e remover elementos da tabela.*/


// Classe para a tabela hash com encadeamento
class TabelaHash {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    // Função hash simples para strings
    hash(chave) {
        let soma = 0;

        for (let i = 0; i < chave.length; i++) {
            soma += chave.charCodeAt(i);
        }

        return soma % this.tamanho;
    }

    // Inserir par (chave, valor)
    inserir(chave, valor) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        // Se a chave já existir, atualiza o valor
        for (let i = 0; i < lista.length; i++) {
            if (lista[i][0] === chave) {
                lista[i][1] = valor;
                return;
            }
        }

        // Se não existir, adiciona no final da lista
        lista.push([chave, valor]);
    }

    // Buscar valor pela chave
    buscar(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i][0] === chave) {
                return lista[i][1];
            }
        }

        return null;
    }

    // Remover elemento pela chave
    remover(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i][0] === chave) {
                lista.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // Mostrar tabela
    imprimir() {
        for (let i = 0; i < this.tabela.length; i++) {
            console.log(i + ":", this.tabela[i]);
        }
    }
}


// Testando a tabela hash
let hash = new TabelaHash(10);

hash.inserir("ana", "Engenheira");
hash.inserir("joao", "Professor");
hash.inserir("maria", "Médica");
hash.inserir("bia", "Designer");

console.log("Buscar ana:", hash.buscar("ana"));
console.log("Buscar maria:", hash.buscar("maria"));
console.log("Buscar carlos:", hash.buscar("carlos"));

console.log("Remover joao:", hash.remover("joao"));
console.log("Remover pedro:", hash.remover("pedro"));

console.log("Tabela final:");
hash.imprimir();
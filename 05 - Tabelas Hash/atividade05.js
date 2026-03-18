/*5. Aplicação Prática de Tabela Hash: 
○ Implemente um sistema de dicionário utilizando tabelas hash, onde o usuário 
pode armazenar e recuperar palavras com seus significados. Use 
encadeamento para resolver colisões. 
○ Adicione a funcionalidade para lidar com remoção de palavras e buscar 
palavras que não estão no dicionário.*/


//Classe para o dicionário utilizando tabela hash com encadeamento
class DicionarioHash {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    // Função hash para strings
    hash(palavra) {
        let soma = 0;

        for (let i = 0; i < palavra.length; i++) {
            soma += palavra.charCodeAt(i);
        }

        return soma % this.tamanho;
    }

    // Inserir palavra e significado
    inserir(palavra, significado) {
        const indice = this.hash(palavra);
        const lista = this.tabela[indice];

        // Se a palavra já existir, atualiza o significado
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].palavra === palavra) {
                lista[i].significado = significado;
                return;
            }
        }

        // Se não existir, adiciona
        lista.push({ palavra, significado });
    }

    // Buscar palavra
    buscar(palavra) {
        const indice = this.hash(palavra);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].palavra === palavra) {
                return lista[i].significado;
            }
        }

        return "Palavra não encontrada no dicionário.";
    }

    // Remover palavra
    remover(palavra) {
        const indice = this.hash(palavra);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].palavra === palavra) {
                lista.splice(i, 1);
                return "Palavra removida com sucesso.";
            }
        }

        return "Palavra não encontrada para remoção.";
    }

    // Mostrar tabela
    imprimir() {
        for (let i = 0; i < this.tabela.length; i++) {
            console.log(i + ":", this.tabela[i]);
        }
    }
}


// Criando o dicionário
let dicionario = new DicionarioHash(10);

// Inserindo palavras
dicionario.inserir("casa", "Lugar onde uma pessoa mora.");
dicionario.inserir("carro", "Veículo usado para transporte.");
dicionario.inserir("livro", "Conjunto de páginas com conteúdo escrito.");
dicionario.inserir("computador", "Máquina eletrônica que processa dados.");

// Buscando palavras
console.log("Buscar 'casa':", dicionario.buscar("casa"));
console.log("Buscar 'livro':", dicionario.buscar("livro"));
console.log("Buscar 'janela':", dicionario.buscar("janela"));

// Removendo palavras
console.log(dicionario.remover("carro"));
console.log(dicionario.remover("mesa"));

// Buscando após remoção
console.log("Buscar 'carro':", dicionario.buscar("carro"));

// Mostrar tabela final
console.log("Tabela final:");
dicionario.imprimir();
/*6. Análise de Desempenho: 
○ Crie uma tabela hash e insira 500 elementos utilizando uma função de hash 
eficiente. A tabela deve ser ajustada para diferentes tamanhos (50, 100, 
250). 
○ Meça o tempo médio de busca e remoção de elementos e discuta como o 
tamanho da tabela afeta o desempenho.*/ 

class TabelaHash {
    constructor(tamanho) { 
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    // Função hash simples e eficiente para números
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

    // Remover elemento
    remover(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].chave === chave) {
                lista.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}

// Função para testar desempenho
function testarDesempenho(tamanhoTabela) {
    const tabela = new TabelaHash(tamanhoTabela);
    const quantidade = 500;
    let chaves = [];

    // Inserindo 500 elementos
    for (let i = 0; i < quantidade; i++) {
        let chave = i * 13 + 7;
        chaves.push(chave);
        tabela.inserir(chave, "Valor " + chave);
    }

    // Medindo busca
    let inicioBusca = performance.now();

    for (let i = 0; i < quantidade; i++) {
        tabela.buscar(chaves[i]);
    }

    let fimBusca = performance.now();

    // Medindo remoção
    let inicioRemocao = performance.now();

    for (let i = 0; i < quantidade; i++) {
        tabela.remover(chaves[i]);
    }

    let fimRemocao = performance.now();

    let tempoMedioBusca = (fimBusca - inicioBusca) / quantidade;
    let tempoMedioRemocao = (fimRemocao - inicioRemocao) / quantidade;

    console.log("Tabela de tamanho:", tamanhoTabela);
    console.log("Tempo médio de busca:", tempoMedioBusca.toFixed(6), "ms");
    console.log("Tempo médio de remoção:", tempoMedioRemocao.toFixed(6), "ms");
    console.log("-----------------------------------");
}

// Testes
testarDesempenho(50);
testarDesempenho(100);
testarDesempenho(250);
/*4. Estudo de Caso: Sistema de Arquivos: 
○ Implemente uma versão simplificada de um sistema de arquivos utilizando 
uma árvore B+ para armazenar diretórios e arquivos. Permita a busca 
eficiente por um arquivo dado seu nome. 
○ Simule a operação de inserir e remover arquivos e medir o impacto no 
desempenho.*/

// ==================================================
// ÁRVORE B+ SIMPLIFICADA PARA SISTEMA DE ARQUIVOS
// ==================================================

// Classe para representar um nó da árvore B+
class NoBPlus {
    constructor(folha = false) {
        this.folha = folha;
        this.chaves = [];
        this.filhos = [];
        this.proximo = null; // usado para ligar folhas
    }
}
// Classe para representar a árvore B+
class ArvoreBPlus {
    constructor(ordem = 3) {
        this.raiz = new NoBPlus(true);
        this.ordem = ordem;
    }

    // Busca por um arquivo pelo nome
    buscar(nomeArquivo, no = this.raiz) {
        let i = 0;

        while (i < no.chaves.length && nomeArquivo > no.chaves[i].nome) {
            i++;
        }

        if (no.folha) {
            if (i < no.chaves.length && no.chaves[i].nome === nomeArquivo) {
                return no.chaves[i];
            }
            return null;
        }

        return this.buscar(nomeArquivo, no.filhos[i]);
    }

    // Inserção de um arquivo
    inserir(arquivo) {
        const raiz = this.raiz;

        if (raiz.chaves.length === this.ordem - 1) {
            const novaRaiz = new NoBPlus(false);
            novaRaiz.filhos.push(raiz);
            this.dividirFilho(novaRaiz, 0);
            this.raiz = novaRaiz;
        }

        this.inserirNaoCheio(this.raiz, arquivo);
    }
    // Inserção em nó não cheio
    inserirNaoCheio(no, arquivo) {
        if (no.folha) {
            let i = no.chaves.length - 1;

            no.chaves.push(null);

            while (i >= 0 && arquivo.nome < no.chaves[i].nome) {
                no.chaves[i + 1] = no.chaves[i];
                i--;
            }

            no.chaves[i + 1] = arquivo;
        } else {
            let i = no.chaves.length - 1;

            while (i >= 0 && arquivo.nome < no.chaves[i].nome) {
                i--;
            }

            i++;

            if (no.filhos[i].chaves.length === this.ordem - 1) {
                this.dividirFilho(no, i);

                if (arquivo.nome > no.chaves[i].nome) {
                    i++;
                }
            }

            this.inserirNaoCheio(no.filhos[i], arquivo);
        }
    }
    // Dividir um nó filho
    dividirFilho(pai, indice) {
        const filho = pai.filhos[indice];
        const novoNo = new NoBPlus(filho.folha);
        const meio = Math.floor((this.ordem - 1) / 2);

        if (filho.folha) {
            novoNo.chaves = filho.chaves.splice(meio);
            pai.chaves.splice(indice, 0, novoNo.chaves[0]);
            pai.filhos.splice(indice + 1, 0, novoNo);

            novoNo.proximo = filho.proximo;
            filho.proximo = novoNo;
        } else {
            const chaveSubida = filho.chaves[meio];
            novoNo.chaves = filho.chaves.splice(meio + 1);
            filho.chaves.splice(meio);

            novoNo.filhos = filho.filhos.splice(meio + 1);

            pai.chaves.splice(indice, 0, chaveSubida);
            pai.filhos.splice(indice + 1, 0, novoNo);
        }
    }

    // Remover um arquivo pelo nome
    remover(nomeArquivo, no = this.raiz) {
        let i = 0;

        while (i < no.chaves.length && nomeArquivo > no.chaves[i].nome) {
            i++;
        }

        if (no.folha) {
            if (i < no.chaves.length && no.chaves[i].nome === nomeArquivo) {
                no.chaves.splice(i, 1);
                return true;
            }
            return false;
        }

        return this.remover(nomeArquivo, no.filhos[i]);
    }
    // Listar todos os arquivos em ordem
    listarArquivos() {
        let atual = this.raiz;

        while (!atual.folha) {
            atual = atual.filhos[0];
        }

        let arquivos = [];

        while (atual !== null) {
            for (let arquivo of atual.chaves) {
                arquivos.push(arquivo.nome);
            }
            atual = atual.proximo;
        }

        return arquivos;
    }
}

// ===================================
// SISTEMA DE ARQUIVOS SIMPLIFICADO
// ===================================

// Classe para representar o sistema de arquivos
class SistemaArquivos {
    constructor() {
        this.arvore = new ArvoreBPlus(4);
    }

    inserirArquivo(nome, tamanho) {
        this.arvore.inserir({ nome, tamanho });
    }

    buscarArquivo(nome) {
        return this.arvore.buscar(nome);
    }

    removerArquivo(nome) {
        return this.arvore.remover(nome);
    }

    listarArquivos() {
        return this.arvore.listarArquivos();
    }
}

// ===============
// TESTE SIMPLES
// ===============
const sistema = new SistemaArquivos();

sistema.inserirArquivo("documento.txt", 120);
sistema.inserirArquivo("foto.png", 500);
sistema.inserirArquivo("musica.mp3", 4000);
sistema.inserirArquivo("relatorio.pdf", 300);
sistema.inserirArquivo("video.mp4", 12000);

console.log("Arquivos armazenados:");
console.log(sistema.listarArquivos());

console.log("\nBuscando 'foto.png':");
console.log(sistema.buscarArquivo("foto.png"));

console.log("\nRemovendo 'musica.mp3'...");
console.log(sistema.removerArquivo("musica.mp3"));

console.log("\nArquivos após remoção:");
console.log(sistema.listarArquivos());

// =========================
// SIMULAÇÃO DE DESEMPENHO
// =========================

// Função para gerar um nome de arquivo único
function gerarNomeArquivo(indice) {
    return `arquivo_${indice}.txt`;
}
// Função para simular inserção, busca e remoção de arquivos e medir o tempo gasto
function simularDesempenho(quantidade) {
    const sistemaTeste = new SistemaArquivos();

    console.log(`\n===== TESTE COM ${quantidade} ARQUIVOS =====`);

    console.time("Tempo de inserção");
    for (let i = 0; i < quantidade; i++) {
        sistemaTeste.inserirArquivo(gerarNomeArquivo(i), Math.floor(Math.random() * 1000));
    }
    console.timeEnd("Tempo de inserção");

    console.time("Tempo de busca");
    for (let i = 0; i < quantidade; i += 100) {
        sistemaTeste.buscarArquivo(gerarNomeArquivo(i));
    }
    console.timeEnd("Tempo de busca");

    console.time("Tempo de remoção");
    for (let i = 0; i < quantidade; i += 100) {
        sistemaTeste.removerArquivo(gerarNomeArquivo(i));
    }
    console.timeEnd("Tempo de remoção");
}

// Testes de desempenho
simularDesempenho(100);
simularDesempenho(1000);
simularDesempenho(5000);
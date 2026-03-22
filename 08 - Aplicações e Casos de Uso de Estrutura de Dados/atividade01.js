/*1. Aplicação de Filas e Pilhas: 
○ Implemente uma fila para gerenciar uma fila de impressão. O sistema deve 
permitir adicionar novos documentos à fila e imprimir o documento mais 
antigo na fila. 
○ Crie um sistema de navegação em um browser que use uma pilha para 
implementar a funcionalidade de "voltar" e "avançar" entre as páginas 
visitadas.*/  

//=======================
// 1) FILA DE IMPRESSÃO
//=======================

// Implementação de uma fila para gerenciar uma fila de impressão
class FilaImpressao {
    constructor() {
        this.fila = [];
    }

    adicionarDocumento(nome) {
        this.fila.push(nome);
        console.log(`Documento "${nome}" adicionado à fila.`);
    }

    imprimirDocumento() {
        if (this.estaVazia()) {
            console.log("Nenhum documento na fila para imprimir.");
            return;
        }

        const documento = this.fila.shift();
        console.log(`Imprimindo documento: "${documento}"`);
    }

    mostrarFila() {
        if (this.estaVazia()) {
            console.log("A fila de impressão está vazia.");
            return;
        }

        console.log("Fila de impressão:");
        for (let i = 0; i < this.fila.length; i++) {
            console.log(`${i + 1}. ${this.fila[i]}`);
        }
    }

    estaVazia() {
        return this.fila.length === 0;
    }
}

// Teste da fila de impressão
const impressora = new FilaImpressao();

impressora.adicionarDocumento("Trabalho.pdf");
impressora.adicionarDocumento("Foto.png");
impressora.adicionarDocumento("Relatorio.docx");

impressora.mostrarFila();

impressora.imprimirDocumento();
impressora.imprimirDocumento();

impressora.mostrarFila();


//========================
// 2) NAVEGADOR COM PILHA
//========================

// Implementação de um sistema de navegação em um browser usando pilha
class Navegador {
    constructor() {
        this.paginaAtual = null;
        this.pilhaVoltar = [];
        this.pilhaAvancar = [];
    }

    visitarPagina(url) {
        if (this.paginaAtual !== null) {
            this.pilhaVoltar.push(this.paginaAtual);
        }

        this.paginaAtual = url;
        this.pilhaAvancar = [];

        console.log(`Visitando: ${this.paginaAtual}`);
    }

    voltar() {
        if (this.pilhaVoltar.length === 0) {
            console.log("Não há páginas para voltar.");
            return;
        }

        this.pilhaAvancar.push(this.paginaAtual);
        this.paginaAtual = this.pilhaVoltar.pop();

        console.log(`Voltou para: ${this.paginaAtual}`);
    }

    avancar() {
        if (this.pilhaAvancar.length === 0) {
            console.log("Não há páginas para avançar.");
            return;
        }

        this.pilhaVoltar.push(this.paginaAtual);
        this.paginaAtual = this.pilhaAvancar.pop();

        console.log(`Avançou para: ${this.paginaAtual}`);
    }

    mostrarEstado() {
        console.log("\n--- Estado do Navegador ---");
        console.log("Página atual:", this.paginaAtual);
        console.log("Pilha voltar:", this.pilhaVoltar);
        console.log("Pilha avançar:", this.pilhaAvancar);
    }
}

// Teste do navegador
const navegador = new Navegador();

navegador.visitarPagina("google.com");
navegador.visitarPagina("youtube.com");
navegador.visitarPagina("github.com");

navegador.mostrarEstado();

navegador.voltar();
navegador.mostrarEstado();

navegador.voltar();
navegador.mostrarEstado();

navegador.avancar();
navegador.mostrarEstado();

navegador.visitarPagina("openai.com");
navegador.mostrarEstado();
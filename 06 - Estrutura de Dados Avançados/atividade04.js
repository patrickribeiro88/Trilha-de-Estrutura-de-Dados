/*4. Árvore B+: 
○ Implemente uma árvore B+ com grau mínimo de 2 e insira os valores: 15, 5, 
25, 10, 20, 30, 35. 
○ Mostre a estrutura da árvore após cada inserção, destacando a organização 
dos nós internos e folhas.*/ 


// Classe do Nó da Árvore B+
class NoBPlus {
    constructor(folha = false) {
        this.folha = folha;
        this.chaves = [];
        this.filhos = [];
        this.proximo = null;
    }
}
// Classe da Árvore B+
class ArvoreBPlus {
    constructor(ordem = 2) {
        this.ordem = ordem;
        this.raiz = new NoBPlus(true);
    }
    // Insere um valor na árvore
    inserir(valor) {
        const raiz = this.raiz;

        if (raiz.chaves.length === 2 * this.ordem - 1) {
            const novaRaiz = new NoBPlus(false);
            novaRaiz.filhos.push(raiz);
            this.dividirFilho(novaRaiz, 0);
            this.raiz = novaRaiz;
        }

        this.inserirNaoCheio(this.raiz, valor);
    }
    // Insere um valor em um nó que não está cheio
    inserirNaoCheio(no, valor) {
        if (no.folha) {
            no.chaves.push(valor);
            no.chaves.sort((a, b) => a - b);
        } else {
            let i = 0;
            while (i < no.chaves.length && valor >= no.chaves[i]) {
                i++;
            }

            if (no.filhos[i].chaves.length === 2 * this.ordem - 1) {
                this.dividirFilho(no, i);

                if (valor >= no.chaves[i]) {
                    i++;
                }
            }

            this.inserirNaoCheio(no.filhos[i], valor);
        }
    }
    // Divide um nó cheio em dois nós e sobe a chave do meio para o pai
    dividirFilho(pai, indice) {
        const no = pai.filhos[indice];
        const novoNo = new NoBPlus(no.folha);

        const meio = this.ordem;

        if (no.folha) {
            novoNo.chaves = no.chaves.splice(meio - 1);
            novoNo.proximo = no.proximo;
            no.proximo = novoNo;

            pai.chaves.splice(indice, 0, novoNo.chaves[0]);
            pai.filhos.splice(indice + 1, 0, novoNo);
        } else {
            const chaveSobe = no.chaves[meio - 1];
            novoNo.chaves = no.chaves.splice(meio);
            no.chaves.splice(meio - 1, 1);

            novoNo.filhos = no.filhos.splice(meio);

            pai.chaves.splice(indice, 0, chaveSobe);
            pai.filhos.splice(indice + 1, 0, novoNo);
        }
    }
    // Imprime a estrutura da árvore e as folhas encadeadas
    imprimir() {
        console.log("Estrutura da árvore:");
        this.imprimirNo(this.raiz, 0);

        console.log("Folhas encadeadas:");
        let atual = this.raiz;
        while (!atual.folha) {
            atual = atual.filhos[0];
        }

        let folhas = [];
        while (atual) {
            folhas.push("[" + atual.chaves.join(", ") + "]");
            atual = atual.proximo;
        }

        console.log(folhas.join(" -> "));
        console.log("-------------------------");
    }
    // Imprime um nó e seus filhos recursivamente
    imprimirNo(no, nivel) {
        const tipo = no.folha ? "Folha" : "Interno";
        console.log("Nível " + nivel + " - " + tipo + ": [" + no.chaves.join(", ") + "]");

        if (!no.folha) {
            for (let filho of no.filhos) {
                this.imprimirNo(filho, nivel + 1);
            }
        }
    }
}

// Teste
const arvore = new ArvoreBPlus(2);
const valores = [15, 5, 25, 10, 20, 30, 35];

for (let valor of valores) {
    console.log("Inserindo:", valor);
    arvore.inserir(valor);
    arvore.imprimir();
}
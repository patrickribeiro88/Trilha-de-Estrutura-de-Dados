/*3. Endereçamento Aberto (Probing Linear): 
○ Implemente uma tabela hash utilizando probing linear para resolver colisões. 
○ Verifique o comportamento da tabela à medida que você insere mais 
elementos, e analise o que acontece quando a tabela se aproxima de sua 
capacidade máxima.*/


// Classe para a tabela hash com probing linear
class TabelaHashProbingLinear {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null);
    }

    // Função hash simples para números
    hash(chave) {
        return chave % this.tamanho;
    }

    // Inserir elemento
    inserir(chave, valor) {
        let indice = this.hash(chave);
        let indiceInicial = indice;

        //Loop para encontrar uma posição vazia ou a mesma chave para atualização
        do {
            // posição vazia ou mesma chave
            if (this.tabela[indice] === null || this.tabela[indice].chave === chave) {
                this.tabela[indice] = { chave, valor };
                return true;
            }

            // probing linear: vai para a próxima posição
            indice = (indice + 1) % this.tamanho;

        } while (indice !== indiceInicial);

        // tabela cheia
        return false;
    }

    // Buscar elemento
    buscar(chave) {
        let indice = this.hash(chave);
        let indiceInicial = indice;

        // Loop para encontrar a chave ou retornar null se não encontrada
        do { 
            if (this.tabela[indice] === null) {
                return null;
            }

            if (this.tabela[indice].chave === chave) {
                return this.tabela[indice].valor;
            }

            indice = (indice + 1) % this.tamanho;

        // Continua procurando até voltar ao índice inicial    
        } while (indice !== indiceInicial);

        return null;
    }

    // Remover elemento
    remover(chave) {
        let indice = this.hash(chave);
        let indiceInicial = indice;

        // Loop para encontrar a chave e removê-la, ou retornar false se não encontrada
        do {
            if (this.tabela[indice] === null) {
                return false;
            }
            //
            if (this.tabela[indice].chave === chave) {
                this.tabela[indice] = null;
                return true;
            }
            
            indice = (indice + 1) % this.tamanho;
           
        } while (indice !== indiceInicial);

        return false;
    }

    // Mostrar tabela
    imprimir() {
        for (let i = 0; i < this.tabela.length; i++) {
            console.log(i + ":", this.tabela[i]);
        }
    }
}


// Teste
let hash = new TabelaHashProbingLinear(10);

hash.inserir(23, "A");
hash.inserir(33, "B");
hash.inserir(43, "C");
hash.inserir(53, "D");
hash.inserir(63, "E");

console.log("Tabela após inserções:");
hash.imprimir();

console.log("Buscar 43:", hash.buscar(43));
console.log("Buscar 99:", hash.buscar(99));

console.log("Remover 33:", hash.remover(33));
console.log("Tabela após remover 33:");
hash.imprimir();
/*3. Lista Duplamente Encadeada: 
○ Implemente uma lista duplamente encadeada com as operações de inserir no início e remover do final da lista. 
○ Crie uma função que percorra a lista em ambas as direções, imprimindo os 
valores dos nós.*/

// Classe do Nó
class No {
    constructor (valor) {
        this.valor = valor;
        this.proximo = null;
        this.anterior = null;
    }
}
// Classe da Lista Duplamente Encadeada 
class ListaDupla{
    constructor(){
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }
    // Inserir no início 
    inserirNoInicio(valor) {
        const novoNo = new No(valor);

        if (this.inicio === null ){
            this.inicio = novoNo;
            this.fim = novoNo;
        } else {
            novoNo.proximo = this.inicio;
            this.inicio.anterior = novoNo;
            this.inicio = novoNo;
        }
        this.tamanho++;
    }
    // Remover do final
    removerDoFinal(){
        if(this.fim === null){
            return "Lista vazia";
        }
        let removido = this.fim.valor;

        if(this.inicio === this.fim){
            this.inicio = null;
            this.fim = null;

        }else{
            this.fim = this.fim.anterior;
            this.fim.proximo = null;

        }
        this.tamanho--;
        return "Elemento removido: " + removido;
    }
    //Percorrer da esquerda para direita
    percorrerInicioParaFim() {
        let atual = this.inicio;
        let resultado = "";

        while (atual !== null) {
            resultado += atual.valor + "⇌";
            atual = atual.proximo;
        }
        console.log(resultado + "null");
    }
    //Percorrer da direita para esquerda
    percorrerFimParaInicio() {
        let atual = this.fim;
        let resultado = "";

        while(atual !== null){
            resultado += atual.valor + "⇌"
            atual = atual.anterior;
        }
        console.log(resultado + "null");
    }
}
//Testando lista encadeada dupla

const lista = new ListaDupla();

lista.inserirNoInicio(10);
lista.inserirNoInicio(20);
lista.inserirNoInicio(30);

lista.percorrerInicioParaFim();
lista.percorrerFimParaInicio();

console.log(lista.removerDoFinal());

lista.percorrerInicioParaFim();
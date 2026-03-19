/* 1. Vetores:
○ Crie um vetor que armazene 10 números inteiros e desenvolva uma função para buscar um número específico no vetor.
○ Implemente uma função para remover um elemento do vetor em uma
posição específica.*/

let vetor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Função para buscar um número específico no vetor
function buscarNumero(numero) {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] === numero) {
            return "Número encontrado na posiçao: " + i; // Retorna o índice do número encontrado
        }
    }
    return "Número não encontrado"
}
console.log(buscarNumero(5)); // Retorna o índice do número 5

// Função para remover um elemento do vetor em uma posição específica
function removerElemento(posicao) {
    if (posicao >= 0 && posicao < vetor.length) {
        vetor.splice(posicao, 1); // Remove o elemento na posição especificada
        return "Número removido com sucesso na posição: " + posicao
    } else {
       return "Posição inválida.";
    }
    console.log
}
console.log(removerElemento(2)); // Remove o elemento na posição 2
console.log("Vetor atualizado: " + vetor); // Exibe o vetor atualizado após a remoção          



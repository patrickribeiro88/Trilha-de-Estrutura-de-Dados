/*1. Implementação de Funções de Hash: 
○ Implemente uma função de hash simples que recebe uma chave inteira e 
retorna um índice em uma tabela de tamanho 10. 
○ Modifique a função para que funcione com strings, somando os valores 
ASCII dos caracteres e utilizando o operador módulo*/


// Função de hash para números inteiros
function hashNumero(chave) {
    return chave % 10; // tabela de tamanho 10
}
// Teste
console.log(hashNumero(23)); // 3
console.log(hashNumero(45)); // 5
console.log(hashNumero(99)); // 9



// Função de hash para strings
function hashString(chave) {
    let soma = 0;

    for (let i = 0; i < chave.length; i++) {
        soma += chave.charCodeAt(i); // valor ASCII
    }

    return soma % 10; // tabela de tamanho 10
}

// Teste
console.log(hashString("ana"));
console.log(hashString("casa"));
console.log(hashString("patrick"));
/*2. Sequência de Fibonacci: 
○ Implemente uma função recursiva que calcule o enésimo número da 
sequência de Fibonacci. 
○ Analise o desempenho do algoritmo e sugira uma otimização (por exemplo, 
usando memoization ou uma abordagem iterativa). */

// Sequência de Fibonacci usando recursão
function fibonacci(n) {
    // Casos base
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    // Chamada recursiva
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Exemplo de uso
console.log(fibonacci(6)); // Resultado: 8

// Otimização usando memoization
function fibonacciMemo(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }

    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Exemplo
console.log(fibonacciMemo(6)); // 8

// Otimização usando abordagem iterativa
function fibonacciIterativo(n) {
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    let anterior = 0;
    let atual = 1;

    for (let i = 2; i <= n; i++) {
        let proximo = anterior + atual;
        anterior = atual;
        atual = proximo;
    }

    return atual;
}

// Exemplo
console.log(fibonacciIterativo(6)); // 8
/*1. Fatorial Recursivo: 
○ Implemente uma função recursiva para calcular o fatorial de um número 
inteiro nnn. 
○ Determine a complexidade de tempo do algoritmo. */

function fatorial(n) {

    // Caso base: quando n é 1
    if (n === 1) {
        return 1;
    }

    // Chamada recursiva
    return n * fatorial(n - 1);
}

// Exemplo de uso
console.log(fatorial(5)); // Resultado: 120
/*6. Torre de Hanói: 
○ Implemente o algoritmo recursivo para resolver o problema da Torre de 
Hanói, movendo nnn discos de uma haste para outra. 
○ Determine o número de movimentos necessários para resolver o problema e 
sua complexidade de tempo.*/

function torreDeHanoi(n, origem, destino, auxiliar) {
    // Caso base
    if (n === 1) {
        console.log("Mover disco 1 de " + origem + " para " + destino);
        return;
    }

    // Move n-1 discos da origem para a auxiliar
    torreDeHanoi(n - 1, origem, auxiliar, destino);

    // Move o maior disco para o destino
    console.log("Mover disco " + n + " de " + origem + " para " + destino);

    // Move os n-1 discos da auxiliar para o destino
    torreDeHanoi(n - 1, auxiliar, destino, origem);
}

// Exemplo: 3 discos
torreDeHanoi(3, "A", "C", "B");
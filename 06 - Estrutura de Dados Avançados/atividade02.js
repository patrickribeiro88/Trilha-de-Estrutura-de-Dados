/*2. Aplicação de Union-Find em Algoritmos de Grafos: 
○ Utilizando sua implementação de Union-Find, implemente o Algoritmo de 
Kruskal para encontrar a árvore geradora mínima de um grafo ponderado. 
○ Dado um conjunto de arestas e vértices, determine se existe um ciclo no 
grafo.*/

// Implementação de Union-Find com path compression e union by rank
class UnionFind {
    constructor(tamanho) {
        this.parent = [];
        this.rank = [];

        for (let i = 0; i < tamanho; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    // Find com path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    // Union com union by rank
    union(x, y) {
        let raizX = this.find(x);
        let raizY = this.find(y);

        if (raizX === raizY) {
            return false; // já estão no mesmo conjunto
        }

        if (this.rank[raizX] < this.rank[raizY]) {
            this.parent[raizX] = raizY;
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.parent[raizY] = raizX;
        } else {
            this.parent[raizY] = raizX;
            this.rank[raizX]++;
        }

        return true;
    }
}

// Algoritmo de Kruskal
function kruskal(vertices, arestas) {
    // Ordena as arestas pelo peso
    arestas.sort((a, b) => a.peso - b.peso);

    let uf = new UnionFind(vertices);
    let arvoreGeradoraMinima = [];
    let pesoTotal = 0;

    for (let aresta of arestas) {
        let { origem, destino, peso } = aresta;

        // Só adiciona se não formar ciclo
        if (uf.find(origem) !== uf.find(destino)) {
            uf.union(origem, destino);
            arvoreGeradoraMinima.push(aresta);
            pesoTotal += peso;
        }
    }

    return {
        agm: arvoreGeradoraMinima,
        pesoTotal: pesoTotal
    };
}

// Verificar se existe ciclo no grafo
function temCiclo(vertices, arestas) {
    let uf = new UnionFind(vertices);

    for (let aresta of arestas) {
        let { origem, destino } = aresta;

        // Se já estão no mesmo conjunto, existe ciclo
        if (uf.find(origem) === uf.find(destino)) {
            return true;
        }

        uf.union(origem, destino);
    }

    return false;
}

// Exemplo de grafo ponderado
let vertices = 4;

let arestas = [
    { origem: 0, destino: 1, peso: 10 },
    { origem: 0, destino: 2, peso: 6 },
    { origem: 0, destino: 3, peso: 5 },
    { origem: 1, destino: 3, peso: 15 },
    { origem: 2, destino: 3, peso: 4 }
];

// Testando Kruskal
let resultado = kruskal(vertices, arestas);

console.log("Arestas da Árvore Geradora Mínima:");
for (let aresta of resultado.agm) {
    console.log(
        aresta.origem + " - " + aresta.destino + " (peso " + aresta.peso + ")"
    );
}

console.log("Peso total da AGM:", resultado.pesoTotal);

// Testando ciclo
console.log("O grafo possui ciclo?", temCiclo(vertices, arestas));
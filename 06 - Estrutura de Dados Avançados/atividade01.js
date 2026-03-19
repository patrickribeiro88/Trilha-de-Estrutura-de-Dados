/*1. Implementação de Union-Find: 
○ Implemente uma estrutura de conjuntos disjuntos utilizando path 
compression e union by rank. 
○ Teste a estrutura resolvendo o problema de identificar componentes 
conectados em um grafo não direcionado.*/


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
    // Encontra o representante do conjunto ao qual o elemento x pertence
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    // Une os conjuntos que contêm os elementos x e y
    union(x, y) {
        let raizX = this.find(x);
        let raizY = this.find(y);

        if (raizX === raizY) {
            return;
        }

        if (this.rank[raizX] < this.rank[raizY]) {
            this.parent[raizX] = raizY;
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.parent[raizY] = raizX;
        } else {
            this.parent[raizY] = raizX;
            this.rank[raizX]++;
        }
    }
    // Verifica se os elementos x e y estão no mesmo conjunto
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

let uf = new UnionFind(6);

let arestas = [
    [0, 1],
    [1, 2],
    [3, 4]
];

for (let [u, v] of arestas) {
    uf.union(u, v);
}

// Testando conexões
console.log("0 e 2 estão conectados?", uf.connected(0, 2));
console.log("0 e 4 estão conectados?", uf.connected(0, 4));
console.log("3 e 4 estão conectados?", uf.connected(3, 4));
console.log("5 e 1 estão conectados?", uf.connected(5, 1));

for (let i = 0; i < 6; i++) {
    console.log("Representante de", i, "é", uf.find(i));
}
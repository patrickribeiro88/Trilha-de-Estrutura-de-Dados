/*4. Grafos: 
○ Crie um grafo simples utilizando uma lista de adjacência e implemente os 
algoritmos de busca DFS e BFS. 
○ Modifique o grafo para ser direcionado e implemente o algoritmo de Dijkstra 
para encontrar o caminho mais curto entre dois nós.*/

//===========
//  Grafo
//============
class Grafo {
    constructor() {
        this.listaAdj = {};
    }
    // Adiciona um vértice ao grafo
    adicionarVertice(vertice) {
        if (!this.listaAdj[vertice]) {
            this.listaAdj[vertice] = [];
        }
    }
    // Adiciona uma aresta entre dois vértices
    adicionarAresta(v1, v2) {
        this.listaAdj[v1].push(v2);
        this.listaAdj[v2].push(v1); // grafo simples não direcionado
    }

    // DFS recursivo
    dfs(inicio, visitados = new Set()) {
        if (visitados.has(inicio)) {
            return;
        }

        console.log(inicio);
        visitados.add(inicio);

        for (let vizinho of this.listaAdj[inicio]) {
            this.dfs(vizinho, visitados);
        }
    }

    // BFS iterativo
    bfs(inicio) {
        let fila = [inicio];
        let visitados = new Set();

        visitados.add(inicio);

        while (fila.length > 0) {
            let atual = fila.shift();
            console.log(atual);

            for (let vizinho of this.listaAdj[atual]) {
                if (!visitados.has(vizinho)) {
                    visitados.add(vizinho);
                    fila.push(vizinho);
                }
            }
        }
    }
}

// Criando o grafo
let grafo = new Grafo();

grafo.adicionarVertice("A");
grafo.adicionarVertice("B");
grafo.adicionarVertice("C");
grafo.adicionarVertice("D");
grafo.adicionarVertice("E");

grafo.adicionarAresta("A", "B");
grafo.adicionarAresta("A", "C");
grafo.adicionarAresta("B", "D");
grafo.adicionarAresta("C", "E");

console.log("DFS a partir de A:");
grafo.dfs("A");

console.log("BFS a partir de A:");
grafo.bfs("A");


//================================
//  Grafo Direcionado e Dijkstra
//================================

// Grafo direcionado com pesos
class GrafoDirecionado {
    constructor() {
        this.listaAdj = {};
    }
    // Adiciona um vértice ao grafo
    adicionarVertice(vertice) {
        if (!this.listaAdj[vertice]) {
            this.listaAdj[vertice] = [];
        }
    }
    // Adiciona uma aresta direcionada com peso
    adicionarAresta(origem, destino, peso) {
        this.listaAdj[origem].push({ no: destino, peso: peso });
    }
    // Algoritmo de Dijkstra para encontrar o caminho mais curto
    dijkstra(inicio, fim) {
        let distancias = {};
        let anterior = {};
        let visitados = new Set();

        for (let vertice in this.listaAdj) {
            distancias[vertice] = Infinity;
            anterior[vertice] = null;
        }

        distancias[inicio] = 0;

        while (true) {
            let atual = null;
            let menorDistancia = Infinity;

            for (let vertice in distancias) {
                if (!visitados.has(vertice) && distancias[vertice] < menorDistancia) {
                    menorDistancia = distancias[vertice];
                    atual = vertice;
                }
            }

            if (atual === null) {
                break;
            }

            if (atual === fim) {
                break;
            }

            visitados.add(atual);

            for (let vizinho of this.listaAdj[atual]) {
                let novaDistancia = distancias[atual] + vizinho.peso;

                if (novaDistancia < distancias[vizinho.no]) {
                    distancias[vizinho.no] = novaDistancia;
                    anterior[vizinho.no] = atual;
                }
            }
        }

        let caminho = [];
        let atualCaminho = fim;

        while (atualCaminho !== null) {
            caminho.unshift(atualCaminho);
            atualCaminho = anterior[atualCaminho];
        }

        return {
            distancia: distancias[fim],
            caminho: caminho
        };
    }
}

// Criando o grafo direcionado
let grafoDir = new GrafoDirecionado();

grafoDir.adicionarVertice("A");
grafoDir.adicionarVertice("B");
grafoDir.adicionarVertice("C");
grafoDir.adicionarVertice("D");
grafoDir.adicionarVertice("E");

grafoDir.adicionarAresta("A", "B", 2);
grafoDir.adicionarAresta("A", "C", 4);
grafoDir.adicionarAresta("B", "C", 1);
grafoDir.adicionarAresta("B", "D", 7);
grafoDir.adicionarAresta("C", "E", 3);
grafoDir.adicionarAresta("E", "D", 2);

let resultado = grafoDir.dijkstra("A", "D");

console.log("Menor distância:", resultado.distancia);
console.log("Caminho:", resultado.caminho.join(" -> "));
/*5. Caminhos Mínimos: 
○ Implemente o algoritmo de Dijkstra para um grafo ponderado e calcule o 
caminho mais curto de um vértice para os demais. 
○ Utilize o algoritmo de Floyd-Warshall para calcular o caminho mais curto 
entre todos os pares de nós em um grafo.*/

//================================
//  Grafo Direcionado e Dijkstra
//================================
class GrafoPonderado {
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
        this.listaAdj[destino].push({ no: origem, peso: peso }); // não direcionado
    }
    // Algoritmo de Dijkstra para encontrar o caminho mais curto
    dijkstra(inicio) {
        let distancias = {};
        let visitados = new Set();
        let anterior = {};

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

            visitados.add(atual);

            for (let vizinho of this.listaAdj[atual]) {
                let novaDistancia = distancias[atual] + vizinho.peso;

                if (novaDistancia < distancias[vizinho.no]) {
                    distancias[vizinho.no] = novaDistancia;
                    anterior[vizinho.no] = atual;
                }
            }
        }

        return { distancias, anterior };
    }
    // Função para mostrar o caminho a partir do resultado do Dijkstra
    mostrarCaminho(anterior, destino) {
        let caminho = [];
        let atual = destino;

        while (atual !== null) {
            caminho.unshift(atual);
            atual = anterior[atual];
        }

        return caminho.join(" -> ");
    }
}

// Criando o grafo
let grafo = new GrafoPonderado();

grafo.adicionarVertice("A");
grafo.adicionarVertice("B");
grafo.adicionarVertice("C");
grafo.adicionarVertice("D");
grafo.adicionarVertice("E");

grafo.adicionarAresta("A", "B", 2);
grafo.adicionarAresta("A", "C", 4);
grafo.adicionarAresta("B", "C", 1);
grafo.adicionarAresta("B", "D", 7);
grafo.adicionarAresta("C", "E", 3);
grafo.adicionarAresta("E", "D", 2);

let resultado = grafo.dijkstra("A");

console.log("Menores distâncias a partir de A:");
console.log(resultado.distancias);

console.log("Caminho até D:");
console.log(grafo.mostrarCaminho(resultado.anterior, "D"));

console.log("Caminho até E:");
console.log(grafo.mostrarCaminho(resultado.anterior, "E"));


//====================================
//  Grafo Direcionado e Floyd-Warshall
//====================================

// Função para o algoritmo de Floyd-Warshall
function floydWarshall(vertices, matriz) {
    let dist = [];

    // Copiando a matriz original
    for (let i = 0; i < matriz.length; i++) {
        dist[i] = [];
        for (let j = 0; j < matriz.length; j++) {
            dist[i][j] = matriz[i][j];
        }
    }

    // Algoritmo principal
    for (let k = 0; k < vertices.length; k++) {
        for (let i = 0; i < vertices.length; i++) {
            for (let j = 0; j < vertices.length; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}

let vertices = ["A", "B", "C", "D"];

let INF = Infinity;

// Matriz de adjacência com pesos
let matriz = [
    [0,   3,   INF, 7],
    [3,   0,   1,   8],
    [INF, 1,   0,   2],
    [7,   8,   2,   0]
];

let resultadoFW = floydWarshall(vertices, matriz);

console.log("Matriz de menores caminhos:");
console.log(resultadoFW);
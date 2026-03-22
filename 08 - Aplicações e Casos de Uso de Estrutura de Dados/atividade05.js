/*5. Simulação de Algoritmos de Grafos: 
○ Implemente um grafo não-direcionado para representar uma rede social, 
onde cada vértice é um usuário e cada aresta representa uma amizade. 
Utilize a estrutura de lista de adjacência. 
○ Aplique o algoritmo de busca em largura (BFS) para encontrar a menor 
distância entre dois usuários na rede.*/

// =====================================
// GRAFO NÃO-DIRECIONADO - REDE SOCIAL
// USANDO LISTA DE ADJACÊNCIA
// =====================================

// Classe para representar um grafo
class Grafo {
    constructor() {
        this.listaAdjacencia = {};
    }

    // Adiciona um usuário
    adicionarUsuario(usuario) {
        if (!this.listaAdjacencia[usuario]) {
            this.listaAdjacencia[usuario] = [];
        }
    }

    // Adiciona amizade (aresta não-direcionada)
    adicionarAmizade(usuario1, usuario2) {
        this.adicionarUsuario(usuario1);
        this.adicionarUsuario(usuario2);

        this.listaAdjacencia[usuario1].push(usuario2);
        this.listaAdjacencia[usuario2].push(usuario1);
    }

    // Mostra a rede social
    mostrarRede() {
        console.log("===== REDE SOCIAL =====");
        for (let usuario in this.listaAdjacencia) {
            console.log(`${usuario} -> ${this.listaAdjacencia[usuario].join(", ")}`);
        }
    }

    // BFS para encontrar a menor distância entre dois usuários
    menorDistancia(inicio, destino) {
        if (!this.listaAdjacencia[inicio] || !this.listaAdjacencia[destino]) {
            return {
                distancia: -1,
                caminho: []
            };
        }

        let fila = [];
        let visitados = {};
        let anterior = {};
        let distancia = {};

        for (let usuario in this.listaAdjacencia) {
            visitados[usuario] = false;
            distancia[usuario] = Infinity;
            anterior[usuario] = null;
        }

        fila.push(inicio);
        visitados[inicio] = true;
        distancia[inicio] = 0;

        while (fila.length > 0) {
            let atual = fila.shift();

            for (let vizinho of this.listaAdjacencia[atual]) {
                if (!visitados[vizinho]) {
                    visitados[vizinho] = true;
                    distancia[vizinho] = distancia[atual] + 1;
                    anterior[vizinho] = atual;
                    fila.push(vizinho);

                    if (vizinho === destino) {
                        break;
                    }
                }
            }
        }

        if (distancia[destino] === Infinity) {
            return {
                distancia: -1,
                caminho: []
            };
        }

        let caminho = [];
        let atual = destino;

        while (atual !== null) {
            caminho.unshift(atual);
            atual = anterior[atual];
        }

        return {
            distancia: distancia[destino],
            caminho: caminho
        };
    }
}

// ======================
// TESTE DA REDE SOCIAL
// ======================

const redeSocial = new Grafo();

// Adicionando amizades
redeSocial.adicionarAmizade("Ana", "Bruno");
redeSocial.adicionarAmizade("Ana", "Carlos");
redeSocial.adicionarAmizade("Bruno", "Daniel");
redeSocial.adicionarAmizade("Carlos", "Eduarda");
redeSocial.adicionarAmizade("Daniel", "Fernanda");
redeSocial.adicionarAmizade("Eduarda", "Gabriel");
redeSocial.adicionarAmizade("Fernanda", "Helena");
redeSocial.adicionarAmizade("Gabriel", "Helena");

// Mostrar a rede
redeSocial.mostrarRede();

// ===============
// TESTE DO BFS
// ===============

console.log("\n===== MENOR DISTÂNCIA ENTRE USUÁRIOS =====");

let resultado1 = redeSocial.menorDistancia("Ana", "Helena");
console.log("De Ana até Helena:");
console.log("Distância:", resultado1.distancia);
console.log("Caminho:", resultado1.caminho.join(" -> "));

let resultado2 = redeSocial.menorDistancia("Bruno", "Gabriel");
console.log("\nDe Bruno até Gabriel:");
console.log("Distância:", resultado2.distancia);
console.log("Caminho:", resultado2.caminho.join(" -> "));

let resultado3 = redeSocial.menorDistancia("Ana", "João");
console.log("\nDe Ana até João:");
console.log("Distância:", resultado3.distancia);
console.log("Caminho:", resultado3.caminho.join(" -> "));
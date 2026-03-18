/*7. Função de Hash Personalizada: 
○ Crie uma função de hash para strings que distribua os valores uniformemente 
para uma tabela de tamanho 100. Teste a função com diferentes conjuntos 
de dados e observe a distribuição dos índices gerados. 
○ Qual a proporção de colisões que você observa? Como você ajustaria a 
função para melhorar a distribuição?*/


// Função de hash personalizada para strings
function hashString(str, tamanhoTabela = 100) {
    let hash = 0;
    const primo = 31;

    for (let i = 0; i < str.length; i++) {
        hash = (hash * primo + str.charCodeAt(i)) % tamanhoTabela;
    }

    return hash;
}

// Função para testar a distribuição
function testarDistribuicao(conjunto, tamanhoTabela = 100) {
    let tabela = new Array(tamanhoTabela).fill(0);
    let colisoes = 0;

    for (let i = 0; i < conjunto.length; i++) {
        let indice = hashString(conjunto[i], tamanhoTabela);

        if (tabela[indice] > 0) {
            colisoes++;
        }

        tabela[indice]++;
    }

    console.log("Quantidade de elementos:", conjunto.length);
    console.log("Colisões:", colisoes);
    console.log("Proporção de colisões:", (colisoes / conjunto.length * 100).toFixed(2) + "%");
    console.log("Distribuição dos índices ocupados:");

    for (let i = 0; i < tabela.length; i++) {
        if (tabela[i] > 0) {
            console.log("Índice", i + ":", tabela[i], "elemento(s)");
        }
    }

    console.log("----------------------------------");
}

// Conjunto 1
let palavras1 = [
    "ana", "joao", "maria", "casa", "carro", "livro", "janela",
    "porta", "mesa", "cadeira", "computador", "mouse", "teclado"
];

// Conjunto 2
let palavras2 = [
    "banana", "abacaxi", "laranja", "uva", "morango", "kiwi",
    "melancia", "pera", "manga", "goiaba", "coco", "ameixa"
];

// Conjunto 3
let palavras3 = [
    "azul", "verde", "amarelo", "vermelho", "roxo", "rosa",
    "preto", "branco", "cinza", "laranja", "marrom"
];

// Testes
testarDistribuicao(palavras1);
testarDistribuicao(palavras2);
testarDistribuicao(palavras3);
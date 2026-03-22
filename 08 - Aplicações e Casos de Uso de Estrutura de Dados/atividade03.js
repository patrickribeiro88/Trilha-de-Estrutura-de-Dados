/*3. Busca de Padrões em Textos: 
○ Implemente o algoritmo de força bruta para buscar um padrão em um texto. 
Teste com textos grandes e pequenos. 
○ Implemente o Algoritmo KMP e compare o desempenho com o algoritmo de 
força bruta usando o mesmo texto e padrão.*/

//==========================
// ALGORITMO DE FORÇA BRUTA
//==========================

//Função para busca de padrão usando força bruta
function buscaForcaBruta(texto, padrao) {
    let ocorrencias = [];
    let comparacoes = 0;

    for (let i = 0; i <= texto.length - padrao.length; i++) {
        let j = 0;

        while (j < padrao.length) {
            comparacoes++;

            if (texto[i + j] !== padrao[j]) {
                break;
            }

            j++;
        }

        if (j === padrao.length) {
            ocorrencias.push(i);
        }
    }

    return {
        ocorrencias,
        comparacoes
    };
}

// ========================
// FUNÇÃO AUXILIAR DO KMP
// MONTA A TABELA LPS
// ========================

// Função para construir a tabela LPS para o padrão
function construirLPS(padrao) {
    let lps = new Array(padrao.length).fill(0);
    let tamanho = 0;
    let i = 1;

    while (i < padrao.length) {
        if (padrao[i] === padrao[tamanho]) {
            tamanho++;
            lps[i] = tamanho;
            i++;
        } else {
            if (tamanho !== 0) {
                tamanho = lps[tamanho - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

// ====================
// ALGORITMO KMP
// ====================

// Função para busca de padrão usando o algoritmo KMP
function buscaKMP(texto, padrao) {
    let ocorrencias = [];
    let comparacoes = 0;

    let lps = construirLPS(padrao);

    let i = 0; // índice do texto
    let j = 0; // índice do padrão

    while (i < texto.length) {
        comparacoes++;

        if (texto[i] === padrao[j]) {
            i++;
            j++;
        }

        if (j === padrao.length) {
            ocorrencias.push(i - j);
            j = lps[j - 1];
        } else if (i < texto.length && texto[i] !== padrao[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return {
        ocorrencias,
        comparacoes
    };
}

// ===========================
// TESTE COM TEXTO PEQUENO
// ===========================
const textoPequeno = "ana banana ana";
const padraoPequeno = "ana";

console.log("======================================");
console.log("TESTE COM TEXTO PEQUENO");
console.log("======================================");
console.log("Texto:", textoPequeno);
console.log("Padrão:", padraoPequeno);

const resultadoFBPequeno = buscaForcaBruta(textoPequeno, padraoPequeno);
const resultadoKMPPequeno = buscaKMP(textoPequeno, padraoPequeno);

console.log("\nForça Bruta:");
console.log("Ocorrências:", resultadoFBPequeno.ocorrencias);
console.log("Comparações:", resultadoFBPequeno.comparacoes);

console.log("\nKMP:");
console.log("Ocorrências:", resultadoKMPPequeno.ocorrencias);
console.log("Comparações:", resultadoKMPPequeno.comparacoes);

// ====================
// GERAR TEXTO GRANDE
// ====================
function gerarTextoGrande(repeticoes) {
    let texto = "";

    for (let i = 0; i < repeticoes; i++) {
        texto += "abcxabcdabxabcdabcdabcy ";
    }

    return texto;
}

const textoGrande = gerarTextoGrande(10000);
const padraoGrande = "abcdabcy";

// ========================
// TESTE COM TEXTO GRANDE
// ========================
console.log("\n======================================");
console.log("TESTE COM TEXTO GRANDE");
console.log("======================================");
console.log("Tamanho do texto:", textoGrande.length);
console.log("Padrão:", padraoGrande);

console.time("Tempo Força Bruta");
const resultadoFBGrande = buscaForcaBruta(textoGrande, padraoGrande);
console.timeEnd("Tempo Força Bruta");

console.time("Tempo KMP");
const resultadoKMPGrande = buscaKMP(textoGrande, padraoGrande);
console.timeEnd("Tempo KMP");

console.log("\nForça Bruta:");
console.log("Quantidade de ocorrências:", resultadoFBGrande.ocorrencias.length);
console.log("Comparações:", resultadoFBGrande.comparacoes);

console.log("\nKMP:");
console.log("Quantidade de ocorrências:", resultadoKMPGrande.ocorrencias.length);
console.log("Comparações:", resultadoKMPGrande.comparacoes);

// ==============================
// EXIBIR PRIMEIRAS OCORRÊNCIAS
// ==============================
console.log("\nPrimeiras 10 ocorrências encontradas (Força Bruta):");
console.log(resultadoFBGrande.ocorrencias.slice(0, 10));

console.log("\nPrimeiras 10 ocorrências encontradas (KMP):");
console.log(resultadoKMPGrande.ocorrencias.slice(0, 10));
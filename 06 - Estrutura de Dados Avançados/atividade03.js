/*3. Árvore B: 
○ Implemente uma árvore B com um grau mínimo de 3 e insira os seguintes 
valores: 10, 20, 5, 6, 12, 30, 7, 17. Mostre a estrutura da árvore após cada 
inserção. 
○ Adicione a funcionalidade de remoção e demonstre a remoção dos valores 6 
e 17.*/


// Classe do Nó da Árvore B
class BTreeNode {
    constructor(t, leaf = false) {
        this.t = t;
        this.leaf = leaf;
        this.keys = [];
        this.children = [];
    }
    // Encontra o índice da chave k ou o próximo índice onde k deve ser inserida
    findKey(k) {
        let idx = 0;
        while (idx < this.keys.length && this.keys[idx] < k) {
            idx++;
        }
        return idx;
    }
    // Insere uma chave em um nó que não está cheio
    insertNonFull(k) {
        let i = this.keys.length - 1;

        if (this.leaf) {
            this.keys.push(0);

            while (i >= 0 && this.keys[i] > k) {
                this.keys[i + 1] = this.keys[i];
                i--;
            }

            this.keys[i + 1] = k;
        } else {
            while (i >= 0 && this.keys[i] > k) {
                i--;
            }

            i++;

            if (this.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(i, this.children[i]);

                if (this.keys[i] < k) {
                    i++;
                }
            }

            this.children[i].insertNonFull(k);
        }
    }
    // Divide o filho y do nó atual em dois nós e insere a chave do meio no nó atual
    splitChild(i, y) {
        const z = new BTreeNode(y.t, y.leaf);
        const meio = y.keys[this.t - 1];

        z.keys = y.keys.slice(this.t);
        y.keys = y.keys.slice(0, this.t - 1);

        if (!y.leaf) {
            z.children = y.children.slice(this.t);
            y.children = y.children.slice(0, this.t);
        }

        this.children.splice(i + 1, 0, z);
        this.keys.splice(i, 0, meio);
    }
    // Remove a chave k do nó
    remove(k) {
        const idx = this.findKey(k);

        if (idx < this.keys.length && this.keys[idx] === k) {
            if (this.leaf) {
                this.removeFromLeaf(idx);
            } else {
                this.removeFromNonLeaf(idx);
            }
        } else {
            if (this.leaf) {
                return;
            }

            let flag = idx === this.keys.length;

            if (this.children[idx].keys.length < this.t) {
                this.fill(idx);
            }

            if (flag && idx > this.keys.length) {
                this.children[idx - 1].remove(k);
            } else {
                this.children[idx].remove(k);
            }
        }
    }
    // Remove a chave do nó folha
    removeFromLeaf(idx) {
        this.keys.splice(idx, 1);
    }
    // Remove a chave do nó não folha
    removeFromNonLeaf(idx) {
        const k = this.keys[idx];

        if (this.children[idx].keys.length >= this.t) {
            const pred = this.getPred(idx);
            this.keys[idx] = pred;
            this.children[idx].remove(pred);
        } else if (this.children[idx + 1].keys.length >= this.t) {
            const succ = this.getSucc(idx);
            this.keys[idx] = succ;
            this.children[idx + 1].remove(succ);
        } else {
            this.merge(idx);
            this.children[idx].remove(k);
        }
    }
    // Obtém o predecessor da chave no índice idx
    getPred(idx) {
        let cur = this.children[idx];
        while (!cur.leaf) {
            cur = cur.children[cur.keys.length];
        }
        return cur.keys[cur.keys.length - 1];
    }
    // Obtém o sucessor da chave no índice idx
    getSucc(idx) {
        let cur = this.children[idx + 1];
        while (!cur.leaf) {
            cur = cur.children[0];
        }
        return cur.keys[0];
    }
    // Preenche o filho no índice idx que tem menos de t-1 chaves
    fill(idx) {
        if (idx !== 0 && this.children[idx - 1].keys.length >= this.t) {
            this.borrowFromPrev(idx);
        } else if (
            idx !== this.keys.length &&
            this.children[idx + 1].keys.length >= this.t
        ) {
            this.borrowFromNext(idx);
        } else {
            if (idx !== this.keys.length) {
                this.merge(idx);
            } else {
                this.merge(idx - 1);
            }
        }
    }
    // Toma emprestado uma chave do filho anterior e insere no filho idx
    borrowFromPrev(idx) {
        const child = this.children[idx];
        const sibling = this.children[idx - 1];

        child.keys.unshift(this.keys[idx - 1]);

        if (!child.leaf) {
            child.children.unshift(sibling.children.pop());
        }

        this.keys[idx - 1] = sibling.keys.pop();
    }
    // Toma emprestado uma chave do próximo filho e insere no filho idx
    borrowFromNext(idx) {
        const child = this.children[idx];
        const sibling = this.children[idx + 1];

        child.keys.push(this.keys[idx]);

        if (!child.leaf) {
            child.children.push(sibling.children.shift());
        }

        this.keys[idx] = sibling.keys.shift();
    }
    // Mescla o filho idx com o próximo filho
    merge(idx) {
        const child = this.children[idx];
        const sibling = this.children[idx + 1];

        child.keys.push(this.keys[idx]);
        child.keys = child.keys.concat(sibling.keys);

        if (!child.leaf) {
            child.children = child.children.concat(sibling.children);
        }

        this.keys.splice(idx, 1);
        this.children.splice(idx + 1, 1);
    }
    // Imprime a estrutura da árvore
    print(level = 0) {
        console.log("Nível " + level + ": [" + this.keys.join(" ") + "]");
        if (!this.leaf) {
            for (let child of this.children) {
                child.print(level + 1);
            }
        }
    }
}
// Classe da Árvore B
class BTree {
    constructor(t) {
        this.t = t;
        this.root = null;
    }
    // Insere uma chave na árvore
    insert(k) {
        if (this.root === null) {
            this.root = new BTreeNode(this.t, true);
            this.root.keys.push(k);
        } else {
            if (this.root.keys.length === 2 * this.t - 1) {
                const s = new BTreeNode(this.t, false);
                s.children.push(this.root);
                s.splitChild(0, this.root);

                let i = 0;
                if (s.keys[0] < k) {
                    i++;
                }

                s.children[i].insertNonFull(k);
                this.root = s;
            } else {
                this.root.insertNonFull(k);
            }
        }
    }
    // Remove uma chave da árvore
    remove(k) {
        if (!this.root) {
            return;
        }

        this.root.remove(k);

        if (this.root.keys.length === 0) {
            if (this.root.leaf) {
                this.root = null;
            } else {
                this.root = this.root.children[0];
            }
        }
    }   
    // Imprime a estrutura da árvore
    print() {
        if (this.root !== null) {
            this.root.print();
        } else {
            console.log("Árvore vazia");
        }
    }
}

// Teste
const arvore = new BTree(3);
const valores = [10, 20, 5, 6, 12, 30, 7, 17];

for (let valor of valores) {
    console.log("\nInserindo", valor);
    arvore.insert(valor);
    arvore.print();
}

console.log("\nRemovendo 6");
arvore.remove(6);
arvore.print();

console.log("\nRemovendo 17");
arvore.remove(17);
arvore.print();
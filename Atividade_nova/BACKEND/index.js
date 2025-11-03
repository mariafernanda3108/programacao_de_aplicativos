const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

class Cliente {
  constructor(id, nome, email, telefone, forma_de_pagamento, endereco) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.forma_de_pagamento = forma_de_pagamento;
    this.endereco = endereco;
  }
}

class Produto {
  constructor(id, nome, lote, validade, categoria, quantidade) {
    this.id = id;
    this.nome = nome;
    this.lote = lote;
    this.validade = validade;
    this.categoria = categoria;
    this.quantidade = quantidade;
  }
}

let clientes = [];
let produtos = [];

app.get("/clientes", (req, res) => {
  res.json(clientes);
});

app.post("/clientes", (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !email || !telefone)
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

  const novo = new Cliente(clientes.length + 1, nome, email, telefone);
  clientes.push(novo);
  res.status(201).json(novo);
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
  const { nome, preco, estoque } = req.body;
  if (!nome || preco == null || estoque == null)
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

  const novo = new Produto(produtos.length + 1, nome, preco, estoque);
  produtos.push(novo);
  res.status(201).json(novo);
});

app.listen(port, () => {
  console.log(`✅ API rodando em http://localhost:${port}`);
});
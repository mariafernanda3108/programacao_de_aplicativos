const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_aula', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Usuario = sequelize.define('Usuario', {
    funcionario: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cliente: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
    produtos: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
});

const app = express(); 
app.use(cors());
app.use(express.json()); 

const port = 3000; 


app.get('/', (req, res) => {
    res.send('API está funcionando!');
});


app.get('/funcionario', async (req, res) => {
    const funcionario = await funcionario.findAll();
    res.json(funcionario);
});
app.get('/cliente', async (req, res) => {
    const cliente = await cliente.findAll();
    res.json(cliente);
});
app.get('/produto', async (req, res) => {
    const  produto = await produto.findAll();
    res.json(produto);
});

app.post('/usuario', async (req, res) => {
    try {
        const { nome, email } = req.body;
        const novoUsuario = await Usuario.create({ nome, email });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }
});


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`🚀API rodando em http://localhost:${port}`);
        console.log('🚀Conectado ao banco de dados MySQL.');
    });
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:');
});
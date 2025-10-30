const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Criando conexão com o banco de dados MySQL.
const sequelize = new Sequelize('db_fullstack', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definindo o modelo para tabela no banco de dados.
const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// ROTA DE TESTE
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// ROTA PARA LISTAR TODOS OS USUÁRIOS
app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

// ROTA PARA CRIAR UM NOVO USUÁRIO
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body;
        const novoUsuario = await Usuario.create({ nome, email });
        return res.status(201).json(novoUsuario);
    } catch (error) {
        // Tratamento específico para violação de unique constraint
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }

        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// SINCRONIZA O MODELO COM O BANCO DE DADOS E INICIA O SERVIDOR
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`🚀API rodando em http://localhost:${port}`);
        console.log('🚀Conectado ao banco de dados MySQL.');
    });
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});
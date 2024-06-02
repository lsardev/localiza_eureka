const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const cors = require('cors')
// Middleware para processar JSON e URL-encoded payloads
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL2202@21007240',
    database: 'banco_de_dados',
    insecureAuth: true
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log("Connected to database!");
});

app.get('/buscarAluno1', (req, res) => {
    const nomeAluno = req.query.nomeAluno;
    console.log(nomeAluno)
    if (!nomeAluno) {
        return res.status(400).send('Nome do aluno é necessário');
    }

    

    console.log(`Buscando dados para o aluno: ${nomeAluno}`);
    
    const query = "SELECT tituloTrabalho FROM dados_eureka WHERE nomeAluno = ?";
    db.query(query, [nomeAluno], (err, result) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            return res.status(500).send('Erro ao buscar dados do aluno');
        }
        console.log('Resultado da busca:', result);
        res.json(result);
    });
});

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL2202@21007240',
  database: 'banco_de_dados',
  insecureAuth: true
});


connection.connect(function(err) {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL.');
});

app.get('/buscarUsuarios', (req, res) => {
  const search = req.query.search;
  const query = `SELECT * FROM usuarios WHERE nome LIKE ?`;

  connection.query(query, [`%${search}%`], function(err, results) {
    if (err) {
      console.error('Erro ao executar consulta:', err.stack);
      res.status(500).send('Erro ao executar consulta');
      return;
    }

    res.json(results);
  });
});

app.listen(3306, () => {
  console.log('Servidor rodando na porta 3000');
});

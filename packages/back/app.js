const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost', // O host do banco. Ex: localhost
  port: '3306',
  user: 'root', // Um usuário do banco. Ex: user 
  database: 'teste_native', // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

connection.connect((err) => {
  if (err) {
    console.log('Erro connecting to database...', err.message)
    return
  }
  console.log('Connection established!')
})

connection.end((err) => {
  if (err) {
    console.log('Erro to finish connection...', err.message)
    return
  }
  console.log('The connection was finish...')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
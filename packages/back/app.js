const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const port = 3001;

const sequelize = new Sequelize(
  'teste_native',
  'root',
  '', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
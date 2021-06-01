require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.API_PORT;

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const fetch = require("node-fetch");
const express = require('express');
const cors = require('cors')

const port = process.env.PORT || 3001;


const login = require('./routes/functions/login');
const test = require('./routes/test');
const dashboard = require('./routes/display/dashboard');
const board = require('./routes/display/board');
const create = require('./routes/functions/create');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/test', test);
app.use('/dashboard', dashboard);
app.use('/board', board);
app.use('/create', create);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
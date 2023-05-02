//include libraries
const fetch = require("node-fetch");
const express = require('express');
const cors = require('cors')

//define port for access
//if not on cloud, default port set on 3001
const port = process.env.PORT || 3001;

//define routes to requests
const login = require('./routes/functions/login');
const dashboard = require('./routes/display/dashboard');
const board = require('./routes/display/board');
const create = require('./routes/functions/create');
const card = require('./routes/display/card');
const update = require('./routes/functions/update');

//define app to use cors and json
const app = express();
app.use(cors());
app.use(express.json());

//use routes for requests
app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/board', board);
app.use('/create', create);
app.use('/card', card);
app.use('/update', update)

//log the selected port when server is up
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
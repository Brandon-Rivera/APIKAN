const fetch = require("node-fetch");
const express = require('express');
const cors = require('cors')

const port = process.env.PORT || 3001;


const login = require('./routes/login');
const test = require('./routes/test');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/test', test);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
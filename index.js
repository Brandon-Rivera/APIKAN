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

app.get('/roy', async (req, res) => {
    console.log('body: ', req.body);
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };

    const response = await fetch(`https://university6y.kanbanize.com/api/v2/workspaces//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
})

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
const fetch = require("node-fetch");
const express = require('express');
const cors = require('cors')

const port = process.env.PORT || 3001;

/*
const login = require('./routes/login');
const test = require('./routes/test');
*/

const app = express();
app.use(cors());
app.use(express.json());
/*
const jwt = require('jsonwebtoken');
const config = require('./config/jwt');

app.set("key", config.key);
app.use('/login', login);
app.use('/test', test);
*/

app.post('/login', async (req, res) => {
    console.log('body: ', req.body);
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };

    if(req.body.domain == ''){
        req.body.domain = 'test'
    }
    
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
})

app.get('/', async (req, res) => {
    const values = {
        email: "a01424454@tec.mx",
        pass: "123"
    };
    const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)

    })
    const data = await response.json();
    console.log(values);
    res.json(data);
})


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});
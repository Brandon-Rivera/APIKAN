const fetch = require("node-fetch");
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    console.log('body: ', req.body);
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };
    const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
})

app.get('/', async (req, res) => {
    /*const values = {
        email: req.body.email, 
        pass: req.body.pass
    };*/
    const values = {
        email: "A01424338@tec.mx",
        pass: "Megaparty007"
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
//const jwt = require('jsonwebtoken');
//const config = require('../config/jwt');

module.exports.test = async (req,res) => 
{
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
};

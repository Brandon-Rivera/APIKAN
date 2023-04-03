//const jwt = require('jsonwebtoken');
//const config = require('../config/jwt');


module.exports.doLogin = async (req,res) =>
{
    console.log('body: ', req.body);
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };
    
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/index.php/api/kanbanize/login//format/json`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
}
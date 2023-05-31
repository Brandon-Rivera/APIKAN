//include libraries
const fetch = require("node-fetch");
//helper routes
const tokenBuilder = require('../helpers/tokenBuilder');

//receives post request
//redirects to post request
//requires body with email, pass and domain
module.exports.doLogin = async (req,res) =>
{
    const values = {
        email: req.body.email, 
        pass: req.body.pass
    };

    if(req.body.domain == ''){
        req.body.domain = 'test'
    }
    try {
        const response = await fetch(`https://${req.body.domain}.kanbanize.com/index.php/api/kanbanize/login//format/json`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
        //assigns request response
        const data = await response.json();
        //calls helpers/tokenBuilder/buildToken
        const data1 = tokenBuilder.buildToken(data);
        //returns response
        res.json(data1);
    }
    catch(error) {
        res.status(400).json('Error logging in:' + error);  
    }
}

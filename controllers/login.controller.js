//include libraries
const fetch = require("node-fetch");

//receives post request
//redirects to post request
//requires body with email, password and domain
module.exports.doLogin = async (req,res) =>
{
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
    //assigns request response
    const data = await response.json();
    //returns response
    res.json(data);
}

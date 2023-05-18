//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to post request
//requires body with domain, apikey, cardid and comment
module.exports.doComment = async (req, res) => 
{
    const values = {
        text: req.body.comment
    };
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/comments`,
    {
        method: 'POST',
        headers: {'apikey': req.body.apikey, 
        'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}

//receives post request
//redirects to get request
//requires body with domain, apikey and cardid
module.exports.getComment = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/comments`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
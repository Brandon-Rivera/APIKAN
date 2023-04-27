//include libraries
const fetch = require("node-fetch");

//receives post request
//redirects to get request
//requires body with domain, apikey, card id
module.exports.getCard = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
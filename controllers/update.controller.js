//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to patch request
//requires body with domain, apikey, card id, column id, lane id,
//title, description, owner user id and deadline, lane id
//uses helpers/requestBuilder/confUpdate
module.exports.updateCard = async (req, res) => 
{
    //calls helpers/requestBuilder/confUpdate
    values = requestBuilder.confUpdate(req.body);
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
    {
        method: 'PATCH',
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
//redirects to patch request
//requires body with domain, apikey, card id, column id and lane id
//uses helpers/requestBuilder/setMove
module.exports.moveCard = async (req, res) => 
{
    //calls helpers/requestBuilder/setMove
    values = requestBuilder.setMove(req.body);
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
    {
        method: 'PATCH',
        headers: {'apikey': req.body.apikey, 
        'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
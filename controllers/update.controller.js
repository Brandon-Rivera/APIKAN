//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to patch request
//requires body with cardid, title, description, ownerid and deadline
//requires header with supra-access-token
//uses helpers/requestBuilder/confUpdate
module.exports.updateCard = async (req, res) => 
{
    //calls helpers/requestBuilder/confUpdate
    values = requestBuilder.confUpdate(req.body);
    const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
    {
        method: 'PATCH',
        headers: {'apikey': req.apikey, 
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
//requires body with cardid, columnid, laneid and workflowid
//requires header with supra-access-token
//uses helpers/requestBuilder/setMove
module.exports.moveCard = async (req, res) => 
{
    //calls helpers/requestBuilder/setMove
    values = requestBuilder.setMove(req.body);
    const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
    {
        method: 'PATCH',
        headers: {'apikey': req.apikey, 
        'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
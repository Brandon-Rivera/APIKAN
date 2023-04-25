//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to post request
//requires body with domain, apikey, column id, lane id, title,
//description, owner user id and deadline
//uses helpers/requestBuilder/createCard
module.exports.postCard = async (req, res) => 
{
    //calls helpers/requestBuilder/createCard
    values = requestBuilder.createCard(req.body);
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards`,
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
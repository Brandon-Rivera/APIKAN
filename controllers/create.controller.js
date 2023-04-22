const requestBuilder = require('../helpers/requestBuilder');
const fetch = require("node-fetch");

module.exports.postCard = async (req, res) => 
{
    values = requestBuilder.createCard(req.body);
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards`,
    {
        method: 'POST',
        headers: {'apikey': req.body.apikey, 
        'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    const data = await response.json();
    res.json(data);
}
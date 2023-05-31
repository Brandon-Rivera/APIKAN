//include libraries
const fetch = require("node-fetch");

//receives post request
//redirects to get request
//requires body with cardid
//requires header with supra-access-token
module.exports.getCard = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        //return response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting card:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with cardid
//requires header with supra-access-token
module.exports.getSubtasks = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/subtasks`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        //return response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting subtasks:' + error);  
    }
}
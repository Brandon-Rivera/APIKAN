//include libraries
const fetch = require("node-fetch");
//helper routes
const responseBuilder = require('../helpers/responseBuilder');

//receives post request
//redirects to post request
//requires body with cardid, comment and files
//requires header with supra-access-token
//*Important note: files is an array of objects composed of a
//file_name(string) and link(string) attributes
module.exports.doComment = async (req, res) => 
{
    const values = {
        text: req.body.comment,
        attachments_to_add: req.body.files
    };
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/comments`,
        {
            method: 'POST',
            headers: {'apikey': req.apikey, 
            'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
        //assigns request response
        const data = await response.json();
        //return response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error posting comment:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with cardid
//requires header with supra-access-token
//uses helpers/responseBuilder/dispToLink
module.exports.getComment = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/comments`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        //calls helpers/responseBuilder/dispToLink
        responseBuilder.dispToLink(data);
        //return response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting comment:' + error);  
    }
}
//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

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

//receives post request
//redirects to get request
//requires body with cardid
//requires header with supra-access-token
module.exports.getComment = async (req, res) => 
{
    const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards/${req.body.cardid}/comments`,
    {
        method: 'GET',
        headers: {'apikey': req.apikey}
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
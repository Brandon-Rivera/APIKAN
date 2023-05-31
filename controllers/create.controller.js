//include libraries
const fetch = require("node-fetch");
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to post request
//requires body with columnid, workflowid, laneid, title, description, ownerid and duedate
//requires header with supra-access-token
//uses helpers/requestBuilder/createCard
module.exports.postCard = async (req, res) => 
{
    //calls helpers/requestBuilder/createCard
    values = requestBuilder.createCard(req.body);
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards`,
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
        res.status(400).json('Error creating card:' + error);  
    }
}
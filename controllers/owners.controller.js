//include libraries
const fetch = require('node-fetch');
//helper routes
const requestBuilder = require('../helpers/requestBuilder');

//receives post request
//redirects to double GET requests
//requieres body with boardid
//requires header with supra-access-token
//uses helpers/requestBuilder/createOwners
module.exports.getOwners = async (req, res) =>
{
    try {
        //request 1: GET (board owners)
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/userRoles`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const boardOwners = await response.json();

        //assigns array of board owners
        const ownersArray = requestBuilder.createOwners(boardOwners);

        //request 2: GET (user details)
        const response1 = await fetch(`https://${req.domain}.kanbanize.com/api/v2/users?user_ids=${ownersArray}&is_enabled=1&is_confirmed=1&if_assigned_where_i_am=0&fields=user_id, realname, username, avatar`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });

        //assigns request response
        const owners = await response1.json();
        //returns response
        res.json(owners);
    }
    catch(error) {
        res.status(400).json('Error getting owners:' + error);  
    }
}
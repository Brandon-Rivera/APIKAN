//include libraries
const fetch = require("node-fetch");
//helper routes
const responseBuilder = require('../helpers/responseBuilder');

//receives post request
//redirects to four get requests
//requires body with boardid
//requires header with supra-access-token
//uses helpers/responsebuilder/buildResponse
module.exports.getBoard = async (req, res) => 
{
    try {
        //request 1: get columns
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/columns`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const col = await response.json();

        //request 2: get workflows
        const response1 = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/workflows`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const wf = await response1.json();

        //request 3: get cards
        const response2 = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards?board_ids=${req.body.boardid}&state=active&per_page=1000&fields=card_id, title, description, owner_user_id, type_id, deadline, board_id, workflow_id, column_id, lane_id, section, position`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        let cd = await response2.json();

        //checks if there are more pages to cards
        if(cd.data.pagination.all_pages > 1)
        {
            for(let i = 1; i < cd.data.pagination.all_pages; i++)
            {
                //optional request: get cards other pages
                const responseTemp = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards?board_ids=${req.body.boardid}&state=active&page=${i+1}&per_page=1000&fields=card_id, title, description, owner_user_id, type_id, deadline, board_id, workflow_id, column_id, lane_id, section, position`,
                {
                    method: 'GET',
                    headers: {'apikey': req.apikey}
                });
                //assigns request response
                const cdTemp = await responseTemp.json();

                for(let j = 0; j < cdTemp.data.data.length; j++)
                    cd.data.data.push(cdTemp.data.data[j]);
            }
        }

        //request 4: get lanes
        const response3 = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/lanes`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const ln = await response3.json();

        //calls helpers/responsebuilder/buildResponse
        const data = responseBuilder.buildResponse(col,wf,cd,ln);
        //return response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting board:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with boardid
//requires header with supra-access-token
module.exports.getStructure = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/currentStructure`,
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
        res.status(400).json('Error getting structure:' + error); 
    }
}

//receives post request
//redirects to get request
//requires body with boardid
//requires header with supra-access-token
module.exports.getWorkflows = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/workflows`,
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
        res.status(400).json('Error getting workflows:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with boardid
//requires header with supra-access-token
module.exports.getColumns = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/columns`,
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
        res.status(400).json('Error getting columns:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with boardid
//requires header with supra-access-token
module.exports.getCards = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/cards?board_ids=${req.body.boardid}&state=active&per_page=1000`,
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
        res.status(400).json('Error getting cards:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with boardid
//requires header with supra-access-token
module.exports.getLines = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/lanes`,
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
        res.status(400).json('Error getting lines:' + error);  
    }
}
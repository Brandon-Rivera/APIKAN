//include libraries
const fetch = require("node-fetch");
//helper routes
const responseBuilder = require('../helpers/responseBuilder');

//receives post request
//redirects to get request
//requires header with supra-access-token
module.exports.getDashboard = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/workspaces?is_archived=0&if_assigned_to_boards=1&board_filter_if_assigned=1&board_filter_is_archived=0&expand=boards[board_id,name]`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        }); 
        //assigns request response
        const data = await response.json();
        //returns response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting dashboard:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with userid
//requires header with supra-access-token
module.exports.getUserWorkspaces = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/users/${req.body.userid}/managedWorkspaces`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        //returns response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting workspaces:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with userid
//requires header with supra-access-token
module.exports.getBoards = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        //returns response
        res.json(data);
    }
    catch(error) {
        res.status(400).json('Error getting boards:' + error);  
    }
}

//receives post request
//redirects to double get requests
//requires body with userid
//requires header with supra-access-token
//uses helpers/responsebuilder/compareID
module.exports.getBoardsNotArchived = async (req, res) => 
{
    try {
        //request 1: get
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data = await response.json();
        
        //request 2: get
        const response1 = await fetch(`https://${req.domain}.kanbanize.com/api/v2/boards`,
        {
            method: 'GET',
            headers: {'apikey': req.apikey}
        });
        //assigns request response
        const data1 = await response1.json();

        //calls helpers/responsebuilder/compareID
        const data2 = responseBuilder.compareID(data, data1);
        //return response
        res.json(data2);
    }
    catch(error) {
        res.status(400).json('Error getting boards:' + error);  
    }
}

//receives post request
//redirects to get request
//requires body with userid
//requires header with supra-access-token
module.exports.getWorkspaceInfo = async (req, res) => 
{
    try {
        const response = await fetch(`https://${req.domain}.kanbanize.com/api/v2/workspaces/${req.body.workspaceid}`,
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
        res.status(400).json('Error getting workspace information:' + error);  
    }
}
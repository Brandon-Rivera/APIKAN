//include libraries
const fetch = require("node-fetch");
//helper routes
const responseBuilder = require('../helpers/responseBuilder');

//receives post request
//redirects to get request
//requires body with domain and apikey
module.exports.getDashboard = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/workspaces?is_archived=0&if_assigned_to_boards=1&board_filter_if_assigned=1&board_filter_is_archived=0&expand=boards[board_id,name]`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    }); 
    //assigns request response
    const data = await response.json();
    //returns response
    res.json(data);
}

//receives post request
//redirects to get request
//requires body with user id, domain and apikey
module.exports.getUserWorkspaces = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/managedWorkspaces`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    //returns response
    res.json(data);
}

//receives post request
//redirects to get request
//requires body with user id, domain and apikey
module.exports.getBoards = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    //returns response
    res.json(data);
}

//receives post request
//redirects to double get requests
//requires body with user id, domain and apikey
//uses helpers/responsebuilder/compareID
module.exports.getBoardsNotArchived = async (req, res) => 
{
    //request 1: get
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    
    //request 2: get
    const response1 = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data1 = await response1.json();

    //calls helpers/responsebuilder/compareID
    const data2 = responseBuilder.compareID(data, data1);
    //return response
    res.json(data2);
}

//receives post request
//redirects to get request
//requires body with user id, domain and apikey
module.exports.getWorkspaceInfo = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/workspaces/${req.body.workspaceid}`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    //assigns request response
    const data = await response.json();
    //return response
    res.json(data);
}
const responseBuilder = require('../helpers/responseBuilder');
const fetch = require("node-fetch");


module.exports.getDashboard = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/workspaces?is_archived=0&if_assigned_to_boards=1&board_filter_if_assigned=1&board_filter_is_archived=0&expand=boards[board_id,name]`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    }); 
    const data = await response.json();
    res.json(data);
}

module.exports.getUserWorkspaces = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/managedWorkspaces`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}

module.exports.getBoards = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}

module.exports.getBoardsNotArchived = async (req, res) => 
{
    console.log(req.body);
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/users/${req.body.userid}/boardRoles`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();

    const response1 = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data1 = await response1.json();

    const data2 = responseBuilder.compareID(data, data1);
    res.json(data2);
}

module.exports.getWorkspaceInfo = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/workspaces/${req.body.workspaceid}`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}
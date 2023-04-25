const fetch = require("node-fetch");
const responseBuilder = require('../helpers/responseBuilder');

module.exports.getBoard = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/columns`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const col = await response.json();

    const response1 = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/workflows`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const wf = await response1.json();

    const response2 = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards?board_ids=${req.body.boardid}&state=active&per_page=1000&fields=card_id, title, description, owner_user_id, type_id, deadline, board_id, workflow_id, column_id, lane_id, section, position`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const cd = await response2.json();

    const data = responseBuilder.buildResponse(col,wf,cd);
    res.json(data);
}

module.exports.getStructure = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/currentStructure`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}

module.exports.getWorkflows = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/workflows`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}

module.exports.getColumns = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/boards/${req.body.boardid}/columns`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}

module.exports.getCards = async (req, res) => 
{
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards?board_ids=${req.body.boardid}&state=active&per_page=1000`,
    {
        method: 'GET',
        headers: {'apikey': req.body.apikey}
    });
    const data = await response.json();
    res.json(data);
}
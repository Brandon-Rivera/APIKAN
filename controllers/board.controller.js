const fetch = require("node-fetch");

const dataValidation = require('../helpers/dataValidation');

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

    const data2 = dataValidation.buildResponse(col,wf);
    res.json(data2);
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
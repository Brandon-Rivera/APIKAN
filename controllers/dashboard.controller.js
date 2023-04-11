const dataValidation = require('../helpers/dataValidation');


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

    const data2 = dataValidation.compareID(data, data1);
    res.json(data2);
}
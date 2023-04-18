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
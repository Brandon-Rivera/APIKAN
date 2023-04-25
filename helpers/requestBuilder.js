//function receives body
//assigns values to request body structure
module.exports.createCard = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid,
        "lane_id": data.workflowid,
        //"position": 0,
        //"track": 0,
        //"planned_start_date": "2023-04-21",
        //"planned_end_date": "2023-04-21",
        //"actual_start_time": "2023-04-21T19:10:25.727Z",
        //"actual_end_time": "2023-04-21T19:10:25.727Z",
        "title": data.title,
        "description": data.description,
        //"custom_id": "string",
        "owner_user_id": data.ownerid,
        //"type_id": 0,
        //"size": 0,
        //"priority": 250,
        //"color": "string",
        "deadline": data.duedate
        //"reference": "string"
    };

    //returns request
    return req;
}
//function receives body
//assigns values to request body structure
module.exports.createCard = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid,
        "lane_id": data.workflowid,
        "title": data.title,
        "description": data.description,
        "owner_user_id": data.ownerid,
        "deadline": data.duedate
    };

    //returns request
    return req;
}

module.exports.setMove = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid,
        "lane_id": data.workflowid
    };

    //returns request
    return req;
}

module.exports.confUpdate = (data) => 
{
    //creates request object
    let req = {
        "card_id": data.cardid,
        "title": data.title,
        "description": data.description,
        "owner_user_id": data.ownerid,
        "deadline": data.duedate
    };

    //returns request
    return req;
}
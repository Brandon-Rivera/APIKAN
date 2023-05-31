//function receives body
//assigns values to request body structure
module.exports.createCard = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid,
        "lane_id": data.laneid,
        "workflow_id": data.workflowid,
        "title": data.title,
        "description": data.description,
        "owner_user_id": data.ownerid,
        "deadline": data.duedate
    };

    //returns request
    return req;
}

//function receives body
//assigns values to request body structure
module.exports.setMove = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid,
        "lane_id": data.laneid,
        "workflow_id": data.workflowid
    };

    //returns request
    return req;
}

//function receives body
//assigns values to request body structure
module.exports.setNext = (data) => 
{
    //creates request object
    let req = {
        "column_id": data.columnid
    };

    //returns request
    return req;
}

//function receives body
//assigns values to request body structure
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

// function receives user roles response
// creates an array of user_id
module.exports.createOwners = (listO) =>
{
    // definition of array
    let req = [];

    // pushes user_id from each object
    Object.entries(listO).forEach(item =>
        {
            for (let i = 0; i < item[1].length; i++)
            {
                req.push(item[1][i].user_id)
            }
        })

    // returns array
    return req;
}
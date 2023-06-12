//helper routes
const sorter = require('./sorter.js');

//function to relate boards to workflows through ids
module.exports.compareID = (data,data1) => 
{
    //definition of arrays
    let id = [];
    let data2 = [];

    //push objects if not archived
    Object.entries(data1).forEach(item => 
        {
            for (let i = 0; i < item[1].length; i = i + 1)
            {
                if(!item[1][i].is_archived)
                {
                    id.push(item[1][i])
                }
            }
        })
    //push objects if ids match
    Object.entries(data).forEach(item => 
        {
            for (let i = 0; i < item[1].length; i = i + 1)
            {
                for (let j = 0; j < id.length; j = j + 1)
                {
                    if (item[1][i].board_id == id[j].board_id)
                    {
                        data2.push(id[j])
                    }
                }
            }
        })
        
    //return data
    return data2;
}

//function to reestructure workflows, columns and cards
module.exports.buildResponse = (col,wf,cd,ln) => 
{
    //define objects
    let card = {
        id: 0,
        name: "",
        description: "",
        pos: 0,
        column_id: 0,
        duedate: "",
        owner_id: 0,
        workflow_id: 0
    };
    let column = {
        id: 0,
        name: "",
        workflow_id: 0,
        parent_id: 0,
        section: 0,
        pos: 0,
        kids: [],
        mycards: []
    };
    let workflow = {
        id: 0,
        name: "",
        type: 0,
        pos: 0,
        lanes: [],
        columns: []
    };
    let lane = {
        id: 0,
        workflow_id: 0,
        parent_lane_id: 0,
        pos: 0,
        name: "",
        description: ""
    }
    let res = {
        data: []
    };

    //define principal arrays
    let cards = [];
    let columns = [];
    let workflows = [];
    let lanes = [];

    //define secondary arrays
    let parentcolumns = [];
    let kidcolumns = [];

    //var temp to create objects
    var temp;

    //map cards and create card by card
    Object.entries(cd).forEach((itemCd) => 
        {
            for (let i = 0; i < itemCd[1].data.length; i++)
            {
                //creates object card and assigns attributes
                temp = Object.create(card);
                temp.id = itemCd[1].data[i].card_id;
                temp.name = itemCd[1].data[i].title;
                temp.description = itemCd[1].data[i].description;
                temp.pos = itemCd[1].data[i].position;
                temp.column_id = itemCd[1].data[i].column_id;
                temp.lane_id = itemCd[1].data[i].lane_id;
                temp.owner_id = itemCd[1].data[i].owner_user_id;
                temp.workflow_id = itemCd[1].data[i].workflow_id;
                let date = "";
                if (itemCd[1].data[i].deadline != null)
                {
                    for(let j = 0; j < 10; j++)
                    {
                        date += itemCd[1].data[i].deadline[j];
                    }
                    temp.duedate = date;
                }
                else
                {
                    temp.duedate = null;
                }
                //pushes created card to cards
                cards.push(temp)
            }
        })
    
    //map columns and create column by column
    Object.entries(col).forEach((itemC) => 
        {
            for (let i = 0; i < itemC[1].length; i++)
            {
                //creates object column and assigns attributes
                temp = Object.create(column);
                temp.id = itemC[1][i].column_id;
                temp.name = itemC[1][i].name;
                temp.workflow_id = itemC[1][i].workflow_id;
                temp.parent_id = itemC[1][i].parent_column_id;
                temp.sec = itemC[1][i].section;
                temp.pos = itemC[1][i].position;
                temp.kids = [];
                temp.mycards = [];
                //pushes column to columns
                columns.push(temp)
            }
        })

    //map workflows and create workflow by workflow
    Object.entries(wf).forEach((itemW) => 
        {
            for (let i = 0; i < itemW[1].length; i++)
            {
                //creates object workflow and assigns attributes
                temp = Object.create(workflow);
                temp.id = itemW[1][i].workflow_id;
                temp.name = itemW[1][i].name;
                temp.type = itemW[1][i].type;
                temp.pos = itemW[1][i].position;
                temp.lanes = [];
                temp.columns = [];
                //pushes workflow to workflows
                workflows.push(temp)
            }
        })

    Object.entries(ln).forEach((itemLn) => 
        {
            for (let i = 0; i < itemLn[1].length; i++)
            {
                //creates object lane and assigns attributes
                temp = Object.create(lane);
                temp.id = itemLn[1][i].lane_id;
                temp.workflow_id = itemLn[1][i].workflow_id;
                temp.parent_lane_id = itemLn[1][i].parent_lane_id;
                temp.pos = itemLn[1][i].position;
                temp.name = itemLn[1][i].name;
                temp.description = itemLn[1][i].description;
                //pushes lane to lanes
                lanes.push(temp)
            }
        })
    
    //uses helpers/sorter/insertionSortPos to sort cards
    cards = sorter.insertionSortPos(cards);

    //inserts cards on its columns cards attribute
    for (let i = 0; i < cards.length; i = i + 1)
    {
        for (let j = 0; j < columns.length; j = j + 1)
        {
            //compares ids, if match, inserts card
            if (cards[i].column_id == columns[j].id)
            {
                columns[j].mycards.push(cards[i])
            }
        }
    }

    //define boolean to identify if column is found
    let found = false;

    //assigns kid columns to parent columns
    do
    {
        //resets parents to empty
        parentcolumns = [];
        kidcolumns = [];

        for (let i = 0; i < columns.length; i++)
        {
            //resets found to false
            found = false;
            //set main columns as parent
            if (columns[i].section == null)
            {
                parentcolumns.push(columns[i]);
            }
            else
            {
                for (let j = 0; j < columns.length; j++)
                {
                    //push parent columns
                    if (!found && columns[i].id == columns[j].parent_id)
                    {
                        parentcolumns.push(columns[i]);
                        found = true;
                    }
                }
                //push kid columns
                if (!found && columns[i].parent_id != null)
                {
                    kidcolumns.push(columns[i]);
                }
                //push parent columns
                else if (!found)
                {
                    parentcolumns.push(columns[i]);
                }
            }
        }

        //empties columns array
        columns = [];

        //rechecks kid columns and filters parent columns
        for (let i = 0; i < kidcolumns.length; i++)
        {
            found = false;
            for (let j = 0; j < parentcolumns.length; j++)
            {
                if (!found && kidcolumns[i].parent_id == parentcolumns[j].parent_id)
                {
                    parentcolumns.push(kidcolumns[i]);
                    found = true;
                }
            }
            if (!found)
            {
                columns.push(kidcolumns[i])
            }
        }

        //establish filtered kidcolumns
        kidcolumns = columns;

        //uses helpers/sorter/insertionSortPos to sort kid columns
        kidcolumns = sorter.insertionSortPos(kidcolumns);

        //assigns kidcolumns on parent columns
        for (let i = 0; i < kidcolumns.length; i++)
        {
            for (let j = 0; j < parentcolumns.length; j++)
            {
                if (kidcolumns[i].parent_id == parentcolumns[j].id)
                {
                    parentcolumns[j].kids.push(kidcolumns[i]);
                }
            }
        }

        columns = parentcolumns;
    }
    while (kidcolumns.length > 0);

    //uses helpers/sorter/insertionSortPos to sort lanes
    lanes = sorter.insertionSortPos(lanes);

    //assign lanes on workflows
    for (let i = 0; i < lanes.length; i = i + 1)
    {
        for (let j = 0; j < workflows.length; j = j + 1)
        {
            if (lanes[i].workflow_id == workflows[j].id)
            {
                workflows[j].lanes.push(lanes[i]);
            }
        }
    }

    //uses helpers/sorter/insertionSortPos and Sec to sort final parent columns
    columns = sorter.insertionSortPos(columns);
    columns = sorter.insertionSortSec(columns);

    //assign columns on workflows
    for (let i = 0; i < columns.length; i = i + 1)
    {
        for (let j = 0; j < workflows.length; j = j + 1)
        {
            if (columns[i].workflow_id == workflows[j].id)
            {
                workflows[j].columns.push(columns[i]);
            }
        }
    }

    //uses helpers/sorter/insertionSortPos to sort workflows
    workflows = sorter.insertionSortPos(workflows);

    //creates object for response
    let myResponse = Object.create(res);
    myResponse.data = [];

    //assigns workflows to response
    for (let i = 0; i < workflows.length; i = i + 1)
    {
        myResponse.data.push(workflows[i]);
    }

    //returns response
    return myResponse;
}

//function to change image display to link
module.exports.dispToLink = (data) => 
{
    //define variaables
    const imageHTML = "<figure class=\"image";
    const imageHTML2 = "src";
    let cnt = 0;
    let cnt2 = 0;
    let cnt3 = 0;
    let fullText = "";
    let imageLink = "";
    //for to iterate comments
    for (let i = 0; i < data.data.length; i++)
    {
        //for to iterate characters on text
        for (let j = 0; j < data.data[i].text.length; j++)
        {
            cnt = 0;
            //for to iterate characters on imageHTML
            for (let k = 0; k < imageHTML.length; k++)
            {
                //if characters match add to cnt
                if (data.data[i].text[j+k] == imageHTML[k])
                {
                    cnt += 1;
                }
                //if character doesn't match, stops for cycle
                else
                {
                    k = imageHTML.length;
                }
            }
            //if all characters match, rebuilds text
            if (cnt == imageHTML.length)
            {
                //for to add text previous to found image
                for (let k = 0; k < j; k++)
                {
                    fullText += data.data[i].text[k];
                    cnt2 ++;
                }
                //for to find the source link
                while (cnt3 < imageHTML2.length) 
                {
                    cnt3 = 0;
                    if (cnt2 > j)
                    {
                        for (let k = 0; k < imageHTML2.length; k++)
                        {
                            if (data.data[i].text[cnt2 + k] == imageHTML2[k])
                            {
                                cnt3++;
                            }
                        }
                    }
                    cnt2++;
                }
                cnt3 = 3
                //while to add link
                while (data.data[i].text[cnt2 + cnt3] != ">")
                {
                    imageLink += data.data[i].text[cnt2 + cnt3];
                    cnt3 ++;
                }
                cnt3 = 0;
                //while to skip text until out of image
                while (cnt3 < 2)
                {
                    cnt2++;
                    if (data.data[i].text[cnt2] == ">")
                    {
                        cnt3 ++;
                    }
                }
                //add image link reference
                fullText += "<a href = ";
                fullText += imageLink;
                fullText += 'target = "_blank">Image</a>';
                cnt2 ++;
                //while to add rest of text
                while (cnt2 < data.data[i].text.length)
                {
                    fullText += data.data[i].text[cnt2];
                    cnt2++;
                }
                //assign new text
                data.data[i].text = fullText;
                //restore variables
                imageLink = "";
                fullText = "";
                cnt = 0;
                cnt2 = 0;
                cnt3 = 0;
            }
        }
    }
}

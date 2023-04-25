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
module.exports.buildResponse = (col,wf,cd) => 
{
    //define objects
    let card = {
        id: 0,
        name: "",
        pos: 0,
        column_id: 0,
        duedate: ""
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
        columns: []
    };
    let res = {
        data: []
    };

    //define principal arrays
    let cards = [];
    let columns = [];
    let workflows = [];

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
                temp.pos = itemCd[1].data[i].position;
                temp.column_id = itemCd[1].data[i].column_id;
                temp.duedate = itemCd[1].data[i].deadline;
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
                temp.columns = [];
                //pushes workflow to workflows
                workflows.push(temp)
            }
        })
    
    //uses helpers/sorter/insertionCardSort to sort cards
    cards = sorter.insertionCardSort(cards);

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

        //uses helpers/sorter/insertionColumnSort to sort kid columns
        kidcolumns = sorter.insertionColumnSort(kidcolumns);

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

    //uses helpers/sorter/insertionFinalColumnSort to sort final parent columns
    columns = sorter.insertionFinalColumnSort(columns);

    //assigncolumns on workflows
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

    //uses helpers/sorter/insertionWorkflowsSort to sort workflows
    workflows = sorter.insertionWorkflowsSort(workflows);

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
const sorter = require('./sorter.js');

module.exports.compareID = (data,data1) => 
{

    let id = [];
    let data2 = [];

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
        
    return data2;
}

module.exports.buildResponse = (col,wf,cd) => 
{

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

    let cards = [];
    let columns = [];
    let workflows = [];

    let parentcolumns = [];
    let kidcolumns = [];

    var temp;

    Object.entries(cd).forEach((itemCd) => 
        {
            for (let i = 0; i < itemCd[1].data.length; i++)
            {
                temp = Object.create(card);
                temp.id = itemCd[1].data[i].card_id;
                temp.name = itemCd[1].data[i].title;
                temp.pos = itemCd[1].data[i].position;
                temp.column_id = itemCd[1].data[i].column_id;
                temp.duedate = itemCd[1].data[i].deadline;
                cards.push(temp)
            }
        })
    
    Object.entries(col).forEach((itemC) => 
        {
            for (let i = 0; i < itemC[1].length; i++)
            {
                temp = Object.create(column);
                temp.id = itemC[1][i].column_id;
                temp.name = itemC[1][i].name;
                temp.workflow_id = itemC[1][i].workflow_id;
                temp.parent_id = itemC[1][i].parent_column_id;
                temp.sec = itemC[1][i].section;
                temp.pos = itemC[1][i].position;
                temp.kids = [];
                temp.mycards = [];
                columns.push(temp)
            }
        })

    Object.entries(wf).forEach((itemW) => 
        {
            for (let i = 0; i < itemW[1].length; i++)
            {
                temp = Object.create(workflow);
                temp.id = itemW[1][i].workflow_id;
                temp.name = itemW[1][i].name;
                temp.type = itemW[1][i].type;
                temp.pos = itemW[1][i].position;
                temp.columns = [];
                workflows.push(temp)
            }
        })
    
    cards = sorter.insertionCardSort(cards);

    for (let i = 0; i < cards.length; i = i + 1)
    {
        for (let j = 0; j < columns.length; j = j + 1)
        {
            if (cards[i].column_id == columns[j].id)
            {
                columns[j].mycards.push(cards[i])
            }
        }
    }

    let found = false;

    do
    {
        parentcolumns = [];
        kidcolumns = [];
        for (let i = 0; i < columns.length; i++)
        {
            found = false;
            if (columns[i].section == null)
            {
                parentcolumns.push(columns[i]);
            }
            else
            {
                for (let j = 0; j < columns.length; j++)
                {
                    if (!found && columns[i].id == columns[j].parent_id)
                    {
                        parentcolumns.push(columns[i]);
                        found = true;
                    }
                }
                if (!found && columns[i].parent_id != null)
                {
                    kidcolumns.push(columns[i]);
                }
                else if (!found)
                {
                    parentcolumns.push(columns[i]);
                }
            }
        }

        columns = [];

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

        kidcolumns = columns;

        kidcolumns = sorter.insertionColumnSort(kidcolumns);

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

    columns = sorter.insertionFinalColumnSort(columns);

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

    workflows = sorter.insertionWorkflowsSort(workflows);

    let myResponse = Object.create(res);
    myResponse.data = [];

    for (let i = 0; i < workflows.length; i = i + 1)
    {
        myResponse.data.push(workflows[i]);
    }

    return myResponse;
}
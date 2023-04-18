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

    //console.log(id);
    
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

module.exports.buildResponse = (col,wf) => 
{

    let ParentNet = [];
    let columns = [];
    let workflows = [];
    let column = {
        id: 0,
        name: "",
        parent_id: 0,
        type: 0,
        kids: []
    };
    let data2 = []

    Object.entries(wf).forEach((itemW) => 
        {
            workflows.push(itemW[1]);
        })
    
    Object.entries(col).forEach((itemC) => 
        {
            columns.push(itemC[1]);
        })

    for (let i = 0; i < columns[0].length; i = i + 1)
    {
        if (columns[0][i].parent_column_id == null)
        {
            let temp = Object.create(column);
            temp.id = columns[0][i].column_id;
            temp.name = columns[0][i].name;
            temp.parent_id = columns[0][i].workflow_id;
            temp.kids = [];
            ParentNet.push(temp);
        }
        else
        {
            for (let j = 0; j < ParentNet.length; j = j + 1)
            {
                if (columns[0][i].parent_column_id == ParentNet[j].id)
                {
                    let temp = Object.create(column);
                    temp.id = columns[0][i].column_id;
                    temp.name = columns[0][i].name;
                    temp.parent_id = columns[0][i].parent_column_id;
                    ParentNet[j].kids.push(temp);
                }
            }
        }
    }

    for (let i = 0; i < workflows[0].length; i = i + 1)
    {
        let temp = Object.create(column);
        temp.id = workflows[0][i].workflow_id;
        temp.name = workflows[0][i].name;
        temp.type = workflows[0][i].type;
        temp.kids = [];
        data2.push(temp);
    }

    for (let i = 0; i < ParentNet.length; i = i + 1)
    {
        for (let j = 0; j < data2.length; j = j + 1)
        {
            if (ParentNet[i].parent_id == data2[j].id)
            {
                data2[j].kids.push(ParentNet[i]);
            }
        }
    }
    
    return data2;
  }
  
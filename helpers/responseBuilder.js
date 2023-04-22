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

    let ParentNet = [];
    let columns = [];
    let columnsObj = [];
    let workflows = [];
    let cards = [];
    let cnt = 0;
    let id = -1;
    let card = {
        id: 0,
        name: "",
        pos: 0
    };
    let column = {
        id: 0,
        name: "",
        workflow_id: 0,
        parent_id: 0,
        kids: [],
        mycards: []
    };
    let workflow = {
        id: 0,
        name: "",
        type: 0,
        columns: []
    };
    let result = {
        data: []
    };
    let data2 = []

    Object.entries(cd).forEach((itemCd) => 
        {
            cards.push(itemCd[1].data);
        })

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
        let temp = Object.create(column);
        temp.id = columns[0][i].column_id;
        temp.name = columns[0][i].name;
        temp.workflow_id = columns[0][i].workflow_id;
        temp.parent_id = columns[0][i].parent_column_id;
        temp.kids = [];
        temp.mycards = [];
        columnsObj.push(temp);
    }

    for (let i = 0; i < cards[0].length; i = i + 1)
    {
        for (let j = 0; j < columnsObj.length; j = j + 1)
        {
            if (cards[0][i].column_id == columnsObj[j].id)
            {
                let temp = Object.create(card);
                temp.id = cards[0][i].card_id;
                temp.name = cards[0][i].title;
                temp.pos = cards[0][i].position;
                columnsObj[j].mycards.push(temp)
            }
        }
    }
/*
    console.log(columnsObj.length)

    cnt = columnsObj.length-1;
    for (let cnt = columnsObj.length-1; cnt > -1; cnt = cnt - 1)
    {
        if (columnsObj[cnt].parent_id != id && columnsObj[cnt].parent_id != null)
        {
            if(reverse.length != 0)
            {
                for (let i = 0; i < columnsObj.length; i = i + 1)
                {
                    if(columnsObj[i].id == id)
                    {
                        for (let j = reverse.length; j > 0; j = j - 1)
                        {
                            columnsObj[i].kids.push(reverse[j-1])
                        }
                    }
                }
                id = columnsObj[cnt].parent_id;
                reverse = [];
            }
            else
            {
                id = columnsObj[cnt].parent_id;
                reverse.push(columnsObj[cnt]);
            }
        }
        else if(columnsObj[cnt].parent_id != null)
        {
            reverse.push(columnsObj[cnt]);
        }
    }

    console.log(columnsObj.length);

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
        let temp = Object.create(workflow);
        temp.id = workflows[0][i].workflow_id;
        temp.name = workflows[0][i].name;
        temp.type = workflows[0][i].type;
        temp.columns = [];
        data2.push(temp);
    }
    

    for (let i = 0; i < ParentNet.length; i = i + 1)
    {
        for (let j = 0; j < data2.length; j = j + 1)
        {
            if (ParentNet[i].parent_id == data2[j].id)
            {
                data2[j].columns.push(ParentNet[i]);
            }
        }
    }

    */
    for (let i = 0; i < columnsObj.length; i = i + 1)
    {
        if (columnsObj[i].parent_id == null)
        {
            ParentNet.push(columnsObj[i]);
        }
    }

    for (let i = 0; i < columnsObj.length; i = i + 1)
    {
        if (columnsObj[i].parent_id != null)
        {
            for (let j = 0; j < ParentNet.length; j = j + 1)
            {
                if (columnsObj[i].parent_id == ParentNet[j].id)
                {
                    ParentNet[j].kids.push(columnsObj[i]);
                }
            }
        }
    }

    for (let i = 0; i < workflows[0].length; i = i + 1)
    {
        let temp = Object.create(workflow);
        temp.id = workflows[0][i].workflow_id;
        temp.name = workflows[0][i].name;
        temp.type = workflows[0][i].type;
        temp.columns = [];
        data2.push(temp);
    }

    for (let i = 0; i < ParentNet.length; i = i + 1)
    {
        for (let j = 0; j < data2.length; j = j + 1)
        {
            if (ParentNet[i].workflow_id == data2[j].id)
            {
                data2[j].columns.push(ParentNet[i]);
            }
        }
    }

    let dataCla = Object.create(result);
    dataCla.data = [];
    for (let i = 0; i < data2.length; i = i + 1)
    {
        dataCla.data.push(data2[i])
    }

    return dataCla;
  }
  
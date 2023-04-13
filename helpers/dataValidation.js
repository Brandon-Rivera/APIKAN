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
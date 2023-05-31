//insertion sort by pos
module.exports.insertionSortPos = (myArray) =>
{ 
    let size = myArray.length;
    let temp;
    let place;
    for (let i =0; i < size; i++) 
    { 
        temp = myArray[i]; 
        for (place = i - 1; place >= 0 && myArray[place].pos > temp.pos; place--) 
        { 
            myArray[place + 1] = myArray[place]; 
        } 
        myArray[place + 1] = temp; 
    }
    return myArray;
}

//insertion sort by sec
module.exports.insertionSortSec = (myArray) =>
{ 
    let size = myArray.length;
    let temp;
    let place;
    for (let i =0; i < size; i++) 
    { 
        temp = myArray[i]; 
        for (place = i - 1; place >= 0 && myArray[place].sec > temp.sec; place--) 
        { 
            myArray[place + 1] = myArray[place]; 
        } 
        myArray[place + 1] = temp; 
    }
    return myArray;
}
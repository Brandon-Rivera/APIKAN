//insertion sort for cards
module.exports.insertionCardSort = (myArray) =>
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

//insertion sort for columns by position
module.exports.insertionColumnSort = (myArray) =>
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

//insertion sort for columns by section
module.exports.insertionFinalColumnSort = (myArray) =>
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

//insertion sort for workflows
module.exports.insertionWorkflowsSort = (myArray) =>
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
module.exports.insertionSort = (myArray) =>
{ 
    let size = myArray.length;
    let temp = 0;
    let place = 0;
    for (let i =0; i < size; i++) 
    { 
        temp = myArray[obj]; 
        for (place = obj - 1; place >= 0 && myArray[place] > temp; place--) 
        { 
            myArray[place + 1] = myArray[place]; 
        } 
        myArray[place + 1] = temp; 
    }
    return myArray;
}


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
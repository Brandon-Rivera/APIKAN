//include libraries 
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fetch = require("node-fetch");
//config routes
const firebaseConfig = require('../config/firebase');

//receives post request
//uploads file to firebase storage and returns download link
//requires body with cardid
//requires file named as toUpload
//requires header with supra-access-token
//note: file max size is set to be 16mb
module.exports.uploadImage = async (req, res) => 
{
    //inicialize firebase
    const fireApp = initializeApp(firebaseConfig);

    //initialize Cloud Storage and get a reference to the service
    const storage = getStorage(fireApp);

    //check if file is sent
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json("No se enviaron archivos");
    }
    
    //upload image
    try {
        const storageRef = ref(storage, req.domain + "/" + req.body.cardid + "/" + String(Math.random()*100000000000000000) + req.files.toUpload.name);
        await uploadBytes(storageRef, req.files.toUpload.data);
        const downloadURL = await getDownloadURL(storageRef);
        res.status(200).json(downloadURL);
    }
    catch(error){
        res.status(400).json('Error uploading file:' + error);  
    }
}


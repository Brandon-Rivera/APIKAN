//include libraries
const jwt = require('jsonwebtoken');
const sjcl = require('sjcl');
//key and password routes 
const {key} = require('../config/jwt');
const {password} = require('../config/sjcl');

//token builder
//uses password to encrypt with sjcl
//uses key to encrypt jwt
//uses apikey, companyname and userid
module.exports.buildToken = (data) =>
{
    if(data.apikey)
    {
        //sjcl encryption
        let eApikey = sjcl.encrypt(password, data.apikey);
        //build payload
        const payload = {
            apikey: eApikey,
            domain: data.companyname,
            id: data.userid
        }
        //create token
        let token = jwt.sign(payload, key, {expiresIn: 7200})
        delete data.apikey; delete data.companyname;
        data.token = token;
    }
    //return token
    return data;
}

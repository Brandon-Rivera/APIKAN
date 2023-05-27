const jwt = require('jsonwebtoken');
const {key} = require('../config/jwt');
const sjcl = require('sjcl');
const {password} = require('../config/sjcl');

module.exports.buildToken = (data) =>
{
    if(data.apikey)
    {
        let eApikey = sjcl.encrypt(password, data.apikey);
        const payload = {
            apikey: eApikey,
            domain: data.companyname,
            id: data.userid
        }
        let token = jwt.sign(payload, key, {expiresIn: 7200})
        delete data.apikey; delete data.companyname;
        data.token = token;
    }
    return data;
}

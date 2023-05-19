const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const sjcl = require('sjcl');
const {password} = require('../config/sjcl');

module.exports.buildToken = (data) =>
{
    if(data.apikey)
    {
        let eApikey = sjcl.encrypt(password, data.apikey);
        console.log(eApikey);
        const payload = {
            apikey: eApikey,
            domain: data.companyname,
            id: data.userid
        }
        let token = jwt.sign(payload, config.key, {expiresIn: 7200})
        delete data.apikey; delete data.companyname;
        data.token = token;
    }
    return data;
}

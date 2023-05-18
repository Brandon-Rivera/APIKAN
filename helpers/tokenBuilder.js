const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

module.exports.buildToken = (data) =>
{
    if(data.apikey)
    {
        const payload = {
            apikey: data.apikey,
            domain: data.companyname,
            id: data.userid
        }
        let token = jwt.sign(payload, config.key, {expiresIn: 7200})
        //delete data.apikey; delete data.companyname;
        data.token = token;
    }
    return data;
}

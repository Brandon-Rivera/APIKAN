//include libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const sjcl = require('sjcl');
const middleware = express.Router();
//key and password routes 
const {password} = require('../config/sjcl');
const {key} = require('../config/jwt');

//supra-access-token validator
//uses middleware to check token
middleware.use((req, res, next) => {
    //gets token from header
    const token = req.headers['supra-access-token']
    if (token) {
        //decode token and verify if valid
        const decode = jwt.verify(token, key, (error, decoded) => {
            if(error)
                return res.status(403).json({mensaje: 'Token inválido'})
            else
            {
                //extract data from token
                let myapikey = sjcl.decrypt(password, decoded.apikey);
                req.apikey = myapikey;
                req.domain = decoded.domain;
                next();
            }
        })
    }else{
        return res.status(401).send({mensaje: 'Token no propocionado'});
    }
})

module.exports = middleware;
const express = require('express');
const jwt = require('jsonwebtoken');
const sjcl = require('sjcl');
const {password} = require('../config/sjcl');
const middleware = express.Router();
const {key} = require('../config/jwt');

middleware.use((req, res, next) => {
    const token = req.headers['supra-access-token']
    if (token) {
        const decode = jwt.verify(token, key, (error, decoded) => {
            if(error)
                return res.status(403).json({mensaje: 'Token inválido'})
            else
            {
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
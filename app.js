const express = require("express");
const recordRoter = require("./route/record-router");
const apiResponseHelper = require("./helper/api-response-helper");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./init-db-connection')();

app.use('/record', recordRoter);

app.use(function(req, res, next){
    apiResponseHelper.notFound(res);
});

module.exports = app;
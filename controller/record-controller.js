const recordService = require("../service/record-service");
const apiResponseHelper = require("../helper/api-response-helper");
const { validationResult } = require('express-validator');

exports.search = (req, res) => {
    try {
        const errors = validationResult(req);

        if (! errors.isEmpty()) {
            return apiResponseHelper.clientError(res,errors.array());
        }

        recordService.search(new Date(req.body.startDate), new Date(req.body.endDate), req.body.minCount, req.body.maxCount)
        .then((records) => {  
            let result = {
                records: []
            }; 

            if(records !== null && records.length > 0){
                records.forEach((record) => {
                    result.records.push({
                        key: record.key,
                        createdAt: record.createdAt,
                        totalCount: record.totalCount
                    });
                });
            }

            return apiResponseHelper.success(res, result);
        })
        .catch((err) => {
            console.error(err);
            return apiResponseHelper.serverError(res, err);
        });
    } catch (err) {
        console.error(err);
        return apiResponseHelper.serverError(res, err);
    }   
};
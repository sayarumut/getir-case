const record = require("../model/record-model");

exports.search = (startDate, endDate, minCount, maxCount) => {
    return record.aggregate([
        {
            $project: { 
                "key": 1, "value": 1, "createdAt": 1, "totalCount": { "$sum": "$counts" }
            }
        },
        {
            $match: { 
                "createdAt": { $gte: startDate, $lte: endDate},
                "totalCount": { $gt: minCount, $lt: maxCount }
            }
        }
    ]);
};
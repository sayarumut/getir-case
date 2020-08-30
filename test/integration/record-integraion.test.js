const axios = require('axios');

describe('POST/record', () => {
    it('should return records with the status of 200', async () => {
        // TODO remove hard coded
        const result = await axios.post('http://localhost:3000/record', {
            "startDate": "2015-12-07",
            "endDate": "2016-12-09",
            "minCount": 48,
            "maxCount": 50
        });

        expect(result.status).toEqual(200);
        expect(result.data).toMatchObject({
            code: 0,
            msg: "Success"
        });
    });
})
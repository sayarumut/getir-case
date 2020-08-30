const mockingoose = require('mockingoose').default;
const model = require('../../model/record-model');
var app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);

const MOCK_DATA = [
  {
      "key": "GRLbHIEk",
      "createdAt": "2016-08-03T23:58:00.940Z",
      "totalCount": 49
  },
  {
      "key": "nVSJettm",
      "createdAt": "2016-11-01T21:30:20.519Z",
      "totalCount": 49
  }
];

describe('test controller', () => {
  it("should return 500", async done => {
    mockingoose(model).toReturn(new Error('Mock Error'), 'aggregate');
    
    const req = await request
    .post('/record')
    .send({
      "startDate": "2015-12-07",
      "endDate": "2016-12-09",
      "minCount": 48,
      "maxCount": 50
    })
    .expect(500, {
      "code": 2,
      "msg": "Something went wrong!"
    });

    done();
  });
});

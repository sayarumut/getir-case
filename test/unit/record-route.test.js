const mockingoose = require('mockingoose').default;
const model = require('../../model/record-model');
const app = require('../../app');
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

// Use the app object in your tests
describe('test router', () => {
  it("should return records from router", async done => {
    mockingoose(model).toReturn(MOCK_DATA, 'aggregate');
    
    const req = await request
    .post('/record')
    .send({
      "startDate": "2015-12-07",
      "endDate": "2016-12-09",
      "minCount": 48,
      "maxCount": 50
    })
    .expect('Content-Type', /json/)
    .expect(200, {
      code: 0,
      msg: "Success",
      records: MOCK_DATA
  });

    done();
  });

  it("should return 400 for startDate", async done => {
    mockingoose(model).toReturn(MOCK_DATA, 'aggregate');
    
    const req = await request
    .post('/record')
    .send({
      "endDate": "2016-12-09",
      "minCount": 48,
      "maxCount": 50
    })
    .expect(400);

    done();
  });

  it("should return 404", async done => {
    mockingoose(model).toReturn(MOCK_DATA, 'aggregate');
    
    const req = await request
    .get('/records')
    .expect(404, {
      "code": 3,
      "msg": "Not Found!"
    });

    done();
  });
});

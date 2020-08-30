const mockingoose = require('mockingoose').default;
const model = require('../../model/record-model');
const service = require('../../service/record-service');

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

describe('test model', () => {
  it('should return records from model', () => {
    mockingoose(model).toReturn(MOCK_DATA, 'aggregate');

    return model.aggregate([])
    .then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(MOCK_DATA);
    });
  });
});
const dbInitializer = require('../../init-db-connection');

describe('test db initializer', () => {
  it("should catch connection error", async done => {
    const OLD_DB_URI = process.env.DB_URI;
    process.env.DB_URI = "Incorrect DB URI";
    await dbInitializer();
    process.env = OLD_DB_URI;
    done();
  });
});

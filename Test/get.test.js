const assert = require('assert');
const supertest = require('supertest');
const app = require('./your-app-file'); // Replace with the path to your actual app file

describe('GET /items', () => {
  it('should return a status code of 200', (done) => {
    supertest(app)
      .get('/items')
      .expect(200, done);
  });

  it('should return a list of items in JSON format', (done) => {
    supertest(app)
      .get('/items')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body instanceof Array, true);
        done();
      });
  });
});

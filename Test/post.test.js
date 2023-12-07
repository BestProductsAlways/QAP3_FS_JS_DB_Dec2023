const assert = require('assert');
const supertest = require('supertest');
const app = require('./your-app-file'); // Replace with the path to your actual app file

describe('POST /items', () => {
  it('should create a new item with a status code of 201', (done) => {
    const newItem = {
      name: 'New Item',
      description: 'This is a new item.',
    };

    supertest(app)
      .post('/items')
      .send(newItem)
      .expect(201, done);
  });
});

const assert = require('assert');
const supertest = require('supertest');
const app = require('./your-app-file'); // Replace with the path to your actual app file

describe('DELETE /items/:id', () => {
  it('should delete an item with a status code of 200', (done) => {
    supertest(app)
      .delete('/items/1') // Replace with a valid item ID
      .expect(200, done);
  });
});

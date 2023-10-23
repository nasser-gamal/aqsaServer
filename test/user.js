const request = require('supertest');
const app = require('../src/app');
const links = require('../src/links/links');

describe('GET /users', function () {
  it('return list of users', function (done) {
    return request(app)
      .get(`/api/user${links.user.GET_USERS}`)
      .expect(200)
      .expect((res) => {
        console.log('response', JSON.stringify(res.body));
      })
      .end(done);
  });
});

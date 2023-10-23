const { expect, assert } = require('chai');
const { isAuth, checkUserRole } = require('../src/middlewares/auth');
const constants = require('../src/utils/constants');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

describe('Auth middleware', () => {
  it('should throw an error if no token is the cookie', () => {
    const req = {
      token: function () {
        return null;
      },
    };

    expect(isAuth.bind(this, {}, () => {})).to.throw(constants.UNAUTHORIZED);
  });

  it('should throw an error if cannot verify', () => {
    const req = {
      get: () => {
        return 'xyz';
      },
    };

    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

  // it('should yield a user after decoding the token', () => {
  //   const req = {
  //     get: () => {
  //       return 'xyz';
  //     },
  //   };

  //   sinon.stub(jwt, 'verify');
  //   jwt.verify.returns({ user: 'abc' });
  //   isAuth(req, {}, () => {});
  //   expect(req).to.have.property('user');
  //   expect(req).to.have.property('user', 'abc');
  //   jwt.verify.restore();
  // });

  it('shoud throw an Error when the user role is not in the requiredRoles', () => {
    const req = {
      user: {
        role: {
          name: 'guest',
        },
      },
    };

    try {
      const middleware = checkUserRole(['superAdmin', 'admin', 'user']);
      middleware(req, {}, () => {});
    } catch (err) {
      assert.strictEqual(err.statusCode, 401);
      assert.strictEqual(err.message, constants.UNAUTHORIZED);
    }
  });
});

const assert = require('assert');
const exp = require('constants');
const isRequestAjaxOrApi = require('../util/isRequestAjaxOrApi');

describe('utild - isRequestAjaxOrApi', function () {
  describe('when req accept html and is not an xhr', function () {
    it('should return false', function () {
      const req = {
        accepts: () => true,
        xhr: false
      };
      const result = isRequestAjaxOrApi(req);
      const expected = false

      assert.strictEqual(result, expected);
    })
  })

  describe('when req doesnt accept html and is not an XMLHttpRequest', function () {
    it('should return false', function () {
      const req = {
        accepts: () => false,
        xhr: false
      };
      const result = isRequestAjaxOrApi(req);
      const expected = true

      assert.strictEqual(result, expected);
    })
  })

  describe('when req accepts html and is an XMLHttpRequest', function () {
    it('should return true', function () {
      const req = {
        accepts: () => true,
        xhr: true
      };
      const result = isRequestAjaxOrApi(req);
      const expected = true

      assert.strictEqual(result, expected);
    })
  })

})

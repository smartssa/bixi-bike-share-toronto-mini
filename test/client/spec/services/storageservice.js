'use strict';

describe('Service: Storageservice', function () {

  // load the service's module
  beforeEach(module('bixiBikeShareTorontoMiniApp'));

  // instantiate service
  var Storageservice;
  beforeEach(inject(function (_Storageservice_) {
    Storageservice = _Storageservice_;
  }));

  it('should do something', function () {
    expect(!!Storageservice).toBe(true);
  });

});

var confi = require('../');
exports.testDefault = function(t) {
  var config = confi.load({ env: 'default' });
  t.equal(config.host, 'localhost');
  t.equal(config.analytics.enabled, true);
  t.equal(config.analytics.profile, 'ga-xxx');
  t.equal(config.env, 'default');
  t.done();
};

exports.testMultiplePaths = function(t) {
  var config = confi.load({ env: 'default', path: ['./conf', './conf2'] });
  t.equal(config.host, 'localhost');
  t.equal(config.env, 'default');
  t.equals(config.multiple, true);
  t.done();
};

exports.testDev = function(t) {
  process.env.testEnv = 'test';
  var config = confi.load();
  t.equal(config.host, 'localhost');
  t.equal(config.apikey, 'asdfasdf');
  t.equal(config.analytics.enabled, false);
  t.equal(config.analytics.profile, 'ga-xxx');
  t.equal(config.isTest, true);
  t.equal(config.testHost, 'localhost/test/path');
  t.equal(config.ENV.testEnv, 'test');
  t.equal(config.testDefault, '123456');
  t.equal(config.testDefault2, 'localhost');
  t.equal(config.testDefault3, '123456');
  t.equal(config.env, 'dev');
  t.done();
};

exports.testProd = function(t) {
  var config = confi.load({ env: "production"});
  t.equal(config.analytics.enabled, true);
  t.equal(config.analytics.profile, 'ga-xxx');
  t.equal(config.host, 'prod');
  t.equal(config.env, 'production');
  t.done();
};

exports.testUser = function(t) {
  console.log('This test won\'t pass unless your username is jga :/');
  var config = confi.load({
    env: 'dev',
    userConfig: true
  });
  t.equal(config.analytics.enabled, true);
  t.done();
};

exports.testUserWithPath = function(t) {
  console.log('This test won\'t pass unless your username is jga :/');
  var config = confi.load({
    env: 'dev',
    userConfig: __dirname + '/conf/users'
  });
  t.equal(config.analytics.enabled, true);
  t.done();
};

exports.testYAML = function(t) {
  var config = confi.load({
    env: 'yaml'
  });

  t.equal(config.analytics.enabled, false);
  t.equal(config.yaml, true);
  t.done();

};

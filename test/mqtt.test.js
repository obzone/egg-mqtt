'use strict';

const mock = require('egg-mock');

describe('test/mqtt.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mqtt-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mqtt')
      .expect(200);
  });
});

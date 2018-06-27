const test = require('ava')
const got = require('got')
const sinon = require('sinon')

const DeploymentsApi = require('./deployments-api')

test.beforeEach(t => {
    t.context.sandbox = sinon.createSandbox()
});
  
test.afterEach.always(t => {
    t.context.sandbox.restore();
});

test('it should report deployments', async t => {
    const serverAPI = sinon.stub(got, 'post')

    process.env.DEPLOYMENTS_SERVER_URL = 'http://foo.com'
    const api = new DeploymentsApi({
        project: 'Test project'
    })

    await api.report()

    t.truthy(serverAPI.called)
})
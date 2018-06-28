const assert = require('assert')
const got = require('got')

class DeploymentsApi {
    constructor(options) {
        this.options = Object.assign(options)
        this.options.environment = this.options.environment || 'production'
    }

    async report() {
        const API_TOKEN = process.env.DEPLOYMENTS_API_TOKEN || 'pseudo-token'
        const DEPLOYMENTS_SERVER_URL = process.env.DEPLOYMENTS_SERVER_URL
        assert(DEPLOYMENTS_SERVER_URL, 'Please specify the DEPLOYMENTS_SERVER_URL environment variable')

        const deployedAt = Date.now()
        assert(this.options.project, 'Please specify the project which has been deployed')

        return got.post(`${DEPLOYMENTS_SERVER_URL}/${API_TOKEN}/deployments`, {
            body: Object.assign(this.options, {
                    deployedAt
                }),
            json: true
        });
    }
}

module.exports = DeploymentsApi

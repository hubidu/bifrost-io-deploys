const assert = require('assert')
const got = require('got')

class DeploymentsApi {
    constructor(options) {
        this.options = Object.assign(options)
        this.options.environment = this.options.environment || 'production'
    }

    async report() {
        const API_TOKEN = process.env.DEPLOYMENTS_API_TOKEN || 'pseudo-token'
        const DEPLOYMENTS_API_URL = process.env.DEPLOYMENTS_API_URL
        assert(DEPLOYMENTS_API_URL, 'Please specify the DEPLOYMENTS_API_URL environment variable')

        assert(this.options.project, 'Please specify the project which has been deployed')

        const url = `${DEPLOYMENTS_API_URL}/${API_TOKEN}/deployments`
        const body = Object.assign(this.options, {
            deployedAt:  Date.now()
        })
        console.log(url, body)
        return got.post(url, {
            body,
            json: true
        });
    }
}

module.exports = DeploymentsApi

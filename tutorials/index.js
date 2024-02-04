// more-or-less the example code from the hapi-pino repo
const hapi = require('@hapi/hapi')
const pinoPretty = require('pino-pretty')

async function start() {
    const server = hapi.server({
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
    })

    server.route({
        method: 'GET',
        path: '/',
        handler() {
            return { success: true }
        },
    })

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response', 'onPostStart'],
            serializers: pinoPretty(),
        },
    })

    await server.start()

    return server
}

start().catch((err) => {
    console.log(err)
})

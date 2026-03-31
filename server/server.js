const { createApp } = require('./app')

function startServer(options = {}) {
  const app = createApp(options)
  const port = options.port ?? Number(process.env.PORT || 3000)
  const host = options.host || '127.0.0.1'

  return new Promise((resolve, reject) => {
    const server = app.listen(port, host, () => {
      const originalClose = server.close.bind(server)
      server.close = (callback) => originalClose((error) => {
        try {
          app.locals.db.close()
        } catch (_closeError) {
          // Ignore repeated close attempts during shutdown.
        }

        if (callback) {
          callback(error)
        }
      })

      resolve(server)
    })

    server.on('error', reject)
  })
}

if (require.main === module) {
  startServer()
    .then((server) => {
      const address = server.address()
      console.log(`Server on ${address.address}:${address.port}`)
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

module.exports = {
  startServer,
}

'use strict'

const { createServer } = require('net')

const FTPSession = require('./lib/session')

function ftpd (opts, sessionCb) {
  if (typeof opts === 'string') {
    const [ host, port ] = opts.split(':')
    opts = { host: host, externalHost:  host,port: parseInt(port, 10) }
  }

  opts = Object.assign({
    host: '127.0.0.1',
    externalHost: '127.0.0.1',
    port: 1337,
    root: '/',
    maxConnections: 10,
    readOnly: true
  }, opts)

  const ftpServer = createServer({ keepAlive: true })
  ftpServer.maxConnections = opts.maxConnections

  if (sessionCb) {
    ftpServer.on('connection', (socket) => {
      const session = new FTPSession(socket, {
        root: opts.root, host: opts.host,externalHost:opts.externalHost, readOnly: opts.readOnly
      })
      session.accept(opts.greet).then(() => {
        sessionCb(session)
      })
    })

    ftpServer.listen(opts.port)
  }

  return ftpServer
}

module.exports = ftpd

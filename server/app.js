const express = require('express')
const { initializeDatabase, resolveDbPath } = require('./db')

function createApp(options = {}) {
  const dbPath = resolveDbPath(options.dbPath)
  const db = initializeDatabase(dbPath)
  const app = express()

  app.locals.db = db
  app.locals.dbPath = dbPath

  app.use(express.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(200).json({ ok: true })
    }

    next()
  })

  app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Server running' })
  })

  const notImplemented = (_req, res) => {
    res.status(501).json({
      ok: false,
      code: 'NOT_IMPLEMENTED',
      message: 'Auth flow is not implemented in phase one.',
    })
  }

  app.post('/register', notImplemented)
  app.post('/login', notImplemented)

  app.use((_req, res) => {
    res.status(404).json({ ok: false, code: 'NOT_FOUND' })
  })

  return app
}

module.exports = {
  createApp,
}

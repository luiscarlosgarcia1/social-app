const express = require('express')
const { loginUser, registerUser } = require('./auth-service')
const { upsertStudentProfile, upsertBusinessProfile } = require('./profile-repository')
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

  app.post('/register', (req, res) => {
    const result = registerUser(db, req.body)

    if (!result.ok) {
      const status = result.code === 'EMAIL_TAKEN' ? 409 : 400
      return res.status(status).json({
        ok: false,
        code: result.code,
      })
    }

    return res.status(201).json({
      ok: true,
      user: result.user,
    })
  })

  app.post('/login', (req, res) => {
    const result = loginUser(db, req.body)

    if (!result.ok) {
      const status = result.code === 'INVALID_CREDENTIALS' ? 401 : 400
      return res.status(status).json({
        ok: false,
        code: result.code,
      })
    }

    return res.status(200).json({
      ok: true,
      user: result.user,
    })
  })

  app.post('/profile/student', (req, res) => {
    const { userId, major, classification, bio } = req.body
    if (!userId || !major || !classification) {
      return res.status(400).json({ ok: false, code: 'VALIDATION_ERROR' })
    }
    const result = upsertStudentProfile(db, { userId, major, classification, bio })
    return res.status(200).json(result)
  })

  app.post('/profile/business', (req, res) => {
    const { userId, projectName, industry, needs } = req.body
    if (!userId || !projectName || !industry) {
      return res.status(400).json({ ok: false, code: 'VALIDATION_ERROR' })
    }
    const result = upsertBusinessProfile(db, { userId, projectName, industry, needs })
    return res.status(200).json(result)
  })

  app.use((error, _req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
      })
    }

    return next(error)
  })

  app.use((_req, res) => {
    res.status(404).json({ ok: false, code: 'NOT_FOUND' })
  })

  return app
}

module.exports = {
  createApp,
}

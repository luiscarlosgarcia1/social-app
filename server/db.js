const fs = require('node:fs')
const path = require('node:path')
const Database = require('better-sqlite3')

const DEFAULT_DB_PATH = path.join(__dirname, '.local', 'auth.db')

function resolveDbPath(overridePath) {
  return overridePath || process.env.AUTH_DB_PATH || DEFAULT_DB_PATH
}

function initializeDatabase(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

module.exports = {
  DEFAULT_DB_PATH,
  initializeDatabase,
  resolveDbPath,
}

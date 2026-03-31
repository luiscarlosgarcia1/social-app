function mapUserRow(row) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
  }
}

function findUserByEmail(db, email) {
  const row = db
    .prepare(`
      SELECT id, email, full_name, phone
      FROM users
      WHERE email = ?
    `)
    .get(email)

  return row ? mapUserRow(row) : null
}

function createUser(db, user) {
  const result = db
    .prepare(`
      INSERT INTO users (email, full_name, phone, password)
      VALUES (@email, @fullName, @phone, @password)
    `)
    .run(user)

  const row = db
    .prepare(`
      SELECT id, email, full_name, phone
      FROM users
      WHERE id = ?
    `)
    .get(result.lastInsertRowid)

  return mapUserRow(row)
}

module.exports = {
  createUser,
  findUserByEmail,
}

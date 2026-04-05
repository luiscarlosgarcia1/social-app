function mapUserRow(row) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
    role: row.role
  }
}

function isUniqueEmailViolation(error) {
  return error && typeof error.code === 'string' && error.code.startsWith('SQLITE_CONSTRAINT')
}

function findUserWithPasswordByEmail(db, email) {
  const row = db
    .prepare(`
      SELECT id, email, full_name, phone, password, role
      FROM users
      WHERE email = ?
    `)
    .get(email)

  if (!row) {
    return null
  }

  return {
    user: mapUserRow(row),
    password: row.password,
  }
}

function createUser(db, user) {
  try {
    const result = db
      .prepare(`
        INSERT INTO users (email, full_name, phone, password, role)
        VALUES (@email, @fullName, @phone, @password, @role)
      `)
      .run(user)

    const row = db
      .prepare(`
        SELECT id, email, full_name, phone
        FROM users
        WHERE id = ?
      `)
      .get(result.lastInsertRowid)

    return {
      ok: true,
      user: mapUserRow(row),
    }
  } catch (error) {
    if (isUniqueEmailViolation(error)) {
      return { ok: false, code: 'EMAIL_TAKEN' }
    }

    throw error
  }
}

module.exports = {
  createUser,
  findUserWithPasswordByEmail,
}

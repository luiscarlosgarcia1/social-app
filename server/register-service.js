const { validateRegistrationPayload } = require('./validation')
const { createUser, findUserByEmail } = require('./user-repository')

function isUniqueEmailViolation(error) {
  return error && typeof error.code === 'string' && error.code.startsWith('SQLITE_CONSTRAINT')
}

function registerUser(db, payload) {
  const validation = validateRegistrationPayload(payload)
  if (!validation.ok) {
    return validation
  }

  if (findUserByEmail(db, validation.value.email)) {
    return { ok: false, code: 'EMAIL_TAKEN' }
  }

  try {
    const user = createUser(db, validation.value)
    return { ok: true, user }
  } catch (error) {
    if (isUniqueEmailViolation(error)) {
      return { ok: false, code: 'EMAIL_TAKEN' }
    }

    throw error
  }
}

module.exports = {
  registerUser,
}

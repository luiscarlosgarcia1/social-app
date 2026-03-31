const { validateLoginPayload } = require('./validation')
const { findUserForLogin } = require('./user-repository')

function loginUser(db, payload) {
  const validation = validateLoginPayload(payload)
  if (!validation.ok) {
    return validation
  }

  const account = findUserForLogin(db, validation.value.email)
  if (!account) {
    return { ok: false, code: 'INVALID_CREDENTIALS' }
  }

  if (account.password !== validation.value.password) {
    return { ok: false, code: 'INVALID_CREDENTIALS' }
  }

  return {
    ok: true,
    user: account.user,
  }
}

module.exports = {
  loginUser,
}

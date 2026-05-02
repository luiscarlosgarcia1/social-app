const { preparePasswordForStorage, comparePassword } = require('./password')
const { getStudentProfile, getBusinessProfile } = require('./profile-repository')
const {
  createUser,
  findUserWithPasswordByEmail,
} = require('./user-repository')
const {
  validateLoginPayload,
  validateRegistrationPayload,
} = require('./validation')

function registerUser(db, payload) {
  const validation = validateRegistrationPayload(payload)
  if (!validation.ok) {
    return validation
  }

  const result = createUser(db, {
    ...validation.value,
    password: preparePasswordForStorage(validation.value.password),
  })

  return result
}

function loginUser(db, payload) {
  const validation = validateLoginPayload(payload)
  if (!validation.ok) {
    return validation
  }

  const account = findUserWithPasswordByEmail(db, validation.value.email)
  if (!account) {
    return { ok: false, code: 'INVALID_CREDENTIALS' }
  }

  if (!comparePassword(validation.value.password, account.password)) {
    return { ok: false, code: 'INVALID_CREDENTIALS' }
  }
  let profile 
  if (account.user.role == 'student'){
     profile = (getStudentProfile(db , account.user.id))
  }
  else {
     profile = (getBusinessProfile(db , account.user.id))
  }

  return {
    ok: true,
    user: { ...account.user, ...profile}, 
  }
}

module.exports = {
  loginUser,
  registerUser,
}

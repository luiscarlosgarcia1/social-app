const bcrypt = require('bcryptjs')

function preparePasswordForStorage(password) {
  return bcrypt.hashSync(password, 10)
}

function comparePassword(submittedPassword, storedPassword) {
  return bcrypt.compareSync(submittedPassword, storedPassword)
}

module.exports = {
  comparePassword,
  preparePasswordForStorage,
}

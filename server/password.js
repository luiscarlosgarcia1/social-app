function preparePasswordForStorage(password) {
  return password
}

function comparePassword(submittedPassword, storedPassword) {
  return submittedPassword === storedPassword
}

module.exports = {
  comparePassword,
  preparePasswordForStorage,
}

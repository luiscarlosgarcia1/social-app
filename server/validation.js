function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function hasValue(value) {
  return typeof value === 'string' && value.trim() !== ''
}

function validateRegistrationPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, code: 'VALIDATION_ERROR' }
  }

  if (!hasValue(payload.email) || !hasValue(payload.fullName) || !hasValue(payload.phone) || !hasValue(payload.password)) {
    return { ok: false, code: 'VALIDATION_ERROR' }
  }

  return {
    ok: true,
    value: {
      email: normalizeEmail(payload.email),
      fullName: payload.fullName,
      phone: payload.phone,
      password: payload.password,
    },
  }
}

module.exports = {
  normalizeEmail,
  validateRegistrationPayload,
}

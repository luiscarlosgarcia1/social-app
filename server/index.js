const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const FILE = path.join(__dirname, 'users.json')
const send = (res, code, data) => {
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 200, { ok: true })
  if (req.method === 'GET' && req.url === '/') return send(res, 200, { message: 'Server running' })
    // CHANGED: renamed from /login to /register
  if (req.method === 'POST' && req.url === '/register') {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      const type = (req.headers['content-type'] || '').split(';')[0]
      const data = type === 'application/x-www-form-urlencoded'
        ? querystring.parse(raw)
        : JSON.parse(raw || '{}')
      const users = JSON.parse(fs.readFileSync(FILE, 'utf8'))
       // CHANGED: now saves email, fullName, and phone as separate fields instead of just emailOrPhone
      users.push({ email: data.email, fullName: data.fullName, phone: data.phone ,password: data.password })
      fs.writeFileSync(FILE, JSON.stringify(users, null, 2))
      send(res, 200, { ok: true })
    })
    return
  }
  // later we should add something that  detect if input is email or phone, then search the correct field
  // ADDED: new /login route that validates credentials instead of saving them
  if (req.method === 'POST' && req.url === '/login') {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      const data = JSON.parse(raw || '{}')
      const users  = JSON.parse(fs.readFileSync(FILE,'utf8'))
      const match = users.find(user => user.email === data.email && user.password === data.password)
      if (match){
        send(res, 200, { ok: true })
      }
      else {
        send(res, 200, {ok : false})
      }
  })
  return
}
  send(res, 404, { error: 'not found' })
}).listen(3000, () => console.log('Server on 3000'))

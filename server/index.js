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
  if (req.method === 'POST' && req.url === '/login') {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      const type = (req.headers['content-type'] || '').split(';')[0]
      const data = type === 'application/x-www-form-urlencoded'
        ? querystring.parse(raw)
        : JSON.parse(raw || '{}')
      const users = JSON.parse(fs.readFileSync(FILE, 'utf8'))
      users.push({ emailOrPhone: data.emailOrPhone, password: data.password })
      fs.writeFileSync(FILE, JSON.stringify(users, null, 2))
      send(res, 200, { ok: true })
    })
    return
  }
  send(res, 404, { error: 'not found' })
}).listen(3000, () => console.log('Server on 3000'))

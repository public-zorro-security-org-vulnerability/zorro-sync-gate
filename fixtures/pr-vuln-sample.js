// Intentionally vulnerable PR fixture — Zorro sync-gate corpus only.
// CWE-89 SQL injection + CWE-798 hardcoded secret.
const express = require('express')
const mysql = require('mysql')

const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE'
const app = express()

app.get('/user', (req, res) => {
  const conn = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root' })
  const q = "SELECT * FROM users WHERE id = '" + req.query.id + "'"
  conn.query(q, (err, rows) => res.json(rows))
})

module.exports = app

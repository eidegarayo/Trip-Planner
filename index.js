const path = require('path')

require('dotenv').load()
const { PORT, URL_DB } = process.env

global.__BASE = path.join(__dirname, 'server');

const db = require('./server/config/db')
const app = require('./server/app')

db.openUri(URL_DB)
  .then(db => console.log(`Connected to DB=${db.name} on HOST=${db.host}...`))

app.listen(PORT)
console.log(`Listening on PORT=${PORT}...`)

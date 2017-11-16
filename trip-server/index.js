require('dotenv').load()
const { PORT, URL_DB } = process.env

const db = require('./server/config/db')
const app = require('./server/app')

db.openUri(URL_DB)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`)

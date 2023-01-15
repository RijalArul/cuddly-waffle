const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

// const PORT = 3000
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const users = require('./routes/user')
const generateEmail = require('./middlewares/cron')
app.use(users)

generateEmail()

module.exports = app

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`)
// })

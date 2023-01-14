const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const port = 3000

const routes = require('./routes/index')
const job = require('./middlewares/cron')
app.use(routes)

job.start()

app.listen(port, () => {
  console.log(`Listening On Port ${port}`)
})

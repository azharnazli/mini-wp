require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const mongoose = require('mongoose')

//routes
const routes = require('./routes/index')

mongoose.connect(`mongodb://localhost/miniwp`, {useNewUrlParser: true})

app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(cors())

app.use(routes)


app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
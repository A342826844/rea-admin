const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const articles = require('./articles')
const dashboard = require('./dashboard')
const picture = require('./picture')
const user = require('./user')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(articles)
app.use(dashboard)
app.use(picture)
app.use(user)
 
app.listen(4444, ()=> {
  console.log('Mock server is running on PORT 4444')
})
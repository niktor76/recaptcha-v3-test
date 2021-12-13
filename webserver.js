// http://161.97.107.249:3333/

const express = require('express')
const app = express()
const port = 3333
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('get')
})

app.post('/', (req, res) => {
  res.send(`Hallo ${req.body.vorname}, was geht?`)
  console.log(req.body.vorname)
})

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})
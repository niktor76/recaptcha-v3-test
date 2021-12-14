// http://161.97.107.249:3333/

const express = require('express')
const axios = require('axios')
const app = express()
const port = 3333
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('get')
})

app.post('/', async (req, res) => {
  console.log('vorname', req.body.vorname)
  const isOk = await isVerified(req.body['g-recaptcha-response'])
  console.log('post', isOk)
  let reaktion
  if (isOk) {
    reaktion = 'Sehr schön, du hast das reCaptcha richtig beantwortet'
  } else {
    reaktion = 'Du hast das reCaptcha nicht richtig beantwortet'
  }
  res.send(`Hallo ${req.body.vorname}, was geht? ` + reaktion)
})

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})




async function isVerified(response) {
  console.log('response:', response)
  const secret = '6LcI-aAdAAAAAAeEcp6jW_OyarPafOiqrkfhMZLB'
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  try {
    const result = await axios(
      {
        method: 'post',
        url: url,
        params: {
          secret: secret,
          response: response
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )
    return result.data.success
  } catch (error) {
    console.log('error', error)
    return false
  }
}
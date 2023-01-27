const express = require('express')
const app = express()
const port = 3000

app.use('/', (req, res, next) => {
  console.log("["+ new Date() + "]: " + req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/welcome', (req, res) => {
  res.send("Bienvenue sur le TP 1 du cours d'architecture logicielle")
})

app.get('/secret', (req, res) => {
  res.status(401)
  res.send('Vous ne possédez pas les droits pour accéder à ma page secrète')
})

app.get('/error', (req, res) => {
  res.status(500)
  res.json({"Message" : "Code d'erreur 500"});
})

app.get('/img', (req, res) => {
  res.download('./img/cat.jpg')  
})

app.get('/redirectMe', (req, res) => {
  res.redirect('https://www.iut-littoral.fr/')  
})

app.get('/users/:name', (req, res) => {
  const name = req.params.name
  res.send(`Bienvenue sur la page de ${name}`)
})

app.get('/somme', (req, res) => {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  const somme = a + b
  res.send(`Le resultat est ${somme}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send("PAGE INVALIDE")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000

let page_visits = {};
// Question 8
app.use('/', (req, res, next) => {
  // Compteur pour la question 10
  let counter = page_visits[req.originalUrl];
  if(counter || counter === 0) {
    page_visits[req.originalUrl] = counter + 1;
  } else {
    page_visits[req.originalUrl] = 1;
  }
  
  date = new Date().toISOString()
  console.log(`[${date}]: ${req.url}`)
  next()
})
// Question 0
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Question 1
app.get('/welcome', (req, res) => {
  res.send("Bienvenue sur le TP 1 du cours d'architecture logicielle")
})
// Question 2
app.get('/secret', (req, res) => {
  res.status(401)
  res.send('Vous ne possédez pas les droits pour accéder à ma page secrète')
})
// Question 3
app.get('/error', (req, res) => {
  res.status(500)
  res.json({"Message" : "Code d'erreur 500"});
})
// Question 4
app.get('/img', (req, res) => {
  res.download('./img/cat.jpg')  
})
// Question 5
app.get('/redirectMe', (req, res) => {
  res.redirect('https://www.iut-littoral.fr/')  
})
// Question 6
app.get('/users/:name', (req, res) => {
  const name = req.params.name
  res.send(`Bienvenue sur la page de ${name}`)
})
// Question 7
app.get('/somme', (req, res) => {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  const somme = a + b
  res.send(`Le resultat est ${somme}`)
})
// Question 10
app.get('/metrics', (req, res) => {

  res.json({"status" : "healthy", 
            "requestsCount" : page_visits,
            " uptime" : process.uptime()});
})
// Question 9
app.use('/', (req, res) => {
  res.status(404)
  res.send("PAGE INVALIDE")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
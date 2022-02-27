const express = require('express')
const app = express()
const port = 3000

app.get('/harriet', (req, res) => {
  res.send('Hello Harriet!!')  
})  
app.get('/sybren', (req, res) => {
  res.send('Hoi Sybren!!')  
})  
app.get('/name/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`)
})  

app.listen(port, () =>   {
  console.log(`Web server listening on http://localhost:${port}`) 
})




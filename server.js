const express = require('express')
const app = express()
const port = 3000;
const movies = [
  {
          "id": 1,
          "slug": "Instock",
          "name": "Instock",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 2,
          "slug": "waterkant",
          "name": "Waterkant",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 3,
          "slug": "mrandmrswatson",
          "name": "Mr & Mrs Watson",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 4,
          "slug": "volkshotel",
          "name": "Volkhotel",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 5,
          "slug": "tapastheater",
          "name": "Tapas Theater",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 6,
          "slug": "tolhuistuin",
          "name": "Tolhuistuin",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 7,
          "slug": "loetje",
          "name": "Loetje",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
{
          "id": 8,
          "slug": "tolhuistuin",
          "name": "Tolhuistuin",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
        {
          "id": 3,
          "slug": "febo",
          "name": "FEBO",
          "facilities": ["wheelchair friendly stairs", "lift"],
          "Reviews": "Good service, lovely people. Five stars",
        },
];

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




const express = require('express')
const app = express()
const port = 3000;
const restaurants = [
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

app.get('/',  (req, res) => {
  // RENDER PAGE
  const title  = (restaurants.length == 0) ? "No restaurants were found" : "Restaurants";
  res.render('restaurantlist', {title, restaurants});
})

app.get('/restaurants/:id/:slug', (req, res) => {
  // FIND RESTAURANT
  const id = req.params.id
  const restaurant = restaurants.find(element => element.id == id)
  console.log(restaurant)
  // RENDER PAGE
  res.render('restaurantetails', {title: `details for restaurant ${restaurant.name}`, restaurant});
})

app.get('/restaurant/add',  (req, res) => {
      // RENDER PAGE
      const title  = "add a new restaurant";
      res.render('addrestaurant', {title});
  })

app.post('/ditistijdelijk', (req,res) => {
      
      const restaurant = {
              name: req.body.name
      }
      movies.push(restaurant);
      console.log("this", restaurants);
      title = "Het is gelukt!";
      res.render('restaurantlist', {title, restaurants});
})

// app.get('/harriet', (req, res) => {
//   res.send('Hello Harriet!!')  
// })  
// app.get('/sybren', (req, res) => {
//   res.send('Hoi Sybren!!')  
// })  
// app.get('/name/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}`)
// })  

app.use(express.static('public'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(port, () =>   {
  console.log(`Web server listening on http://localhost:${port}`) 
})

app.use( (req, res) => {
  res.status(404).send('Error 404: file not found')
})




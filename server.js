import express from 'express'
const app = express()
const port = process.env.PORT || 3000;
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";


import {
  MongoClient,
  ObjectId
} from "mongodb";
dotenv.config();


let db = null;
console.log(process.env.TESTVAR);
const haltes = [{
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


app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get('/results', async (req, res) => {
  //GET DATA FROM DATABASE
  const query = {
    "name": "FEBO"
  }
  const filtered = await db.collection('haltes').find(query).toArray();
  console.log(filtered);



  // RENDER PAGE
  const title = (haltes.length == 0) ? "No stops were found" : "Stops";
  res.render('restaurantlist', {
    restaurants: filtered,
    title: 'Restaurants'
  });
})

app.get('/', (req, res) => {
  // RENDER PAGE
  const title = "Find the best nearest stop for you!";
  res.render('index', {
    title
  });

})

app.get('/restaurants/:id/:slug', (req, res) => {
  // FIND RESTAURANT
  const id = req.params.id
  const restaurant = haltes.find(element => element.id == id)
  console.log(restaurant)
  // RENDER PAGE
  res.render('restaurantdetails', {
    title: `details for restaurant ${restaurant.name}`,
    restaurant
  });
})

app.get('/restaurant/add', (req, res) => {
  // RENDER PAGE
  const title = "add a new restaurant";
  res.render('addrestaurant', {
    title
  });
})

app.post('/ditistijdelijk', (req, res) => {

  const restaurant = {
    name: req.body.name
  }
  halte.push(halte);
  console.log("this", haltes);
  title = "Het is gelukt!";
  res.render('restaurantlist', {
    title,
    haltes
  });

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


app.post("/get-locations", (req, res) => {

  // Data uit form halen

  const formOfTransport = req.query.modaliteit;

  fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=TRAMMETRO_PUNTEN_2021&THEMA=trammetro')
    .then(res => res.json())
    .then(data => {

    })
    .catch(err => console.log(err));






})


// Data gebruiken om fetch te doen 
// Data gebruiken om fetch te doen 
// Data gebruiken om fetch te doen 
// fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=TRAMMETRO_PUNTEN_2021&THEMA=trammetro').then(data => {
//   console.log();
//   return data.json();
// }).then(locations => {

//   locations.
//   res.render('index', {
//     locaties: locations
//   })
// })
//   // Pagina opnieuw weergeven met data

// })

app.use((req, res) => {
  res.status(404).send('Error 404: file not found')
});



async function connectDB() {

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    db = client.db(process.env.DB_NAME);

  } catch (error) {

    throw error;

  }
}




app.listen(port, () => {
  console.log(`Web server listening on http://localhost:${port}`)
  connectDB().then(() => {
    console.log('We have a connection with Mongo !')
  })
});
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

app.get('/', async (req, res) => {
  // RENDER PAGE
  const title = "Find the best nearest stop for you!";

  const type = req.query.type;

  // if (type) {

  console.log('post request received')
  // Data uit form halen
  // const travelLocation = req.body.location;
  // const formOfTransport = req.body.transportType;
  // console.log('formOfTransport', formOfTransport)
  const result = await getData(type) // get data from API, and we still have to pass the data to the matchData and eventually renderResults function

  console.log(result.length)

  // res.send(result);
  res.render('index', {
    stops: result,
    title: 'success'
  })


  // return
  // }

  // res.render('index', {
  //   title,
  //   stops: []
  // });


});

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
});

app.get('/restaurant/add', (req, res) => {
  // RENDER PAGE
  const title = "add a new restaurant";
  res.render('addrestaurant', {
    title
  });
});

// app.post('/ditistijdelijk', (req, res) => {

//   const restaurant = {
//     name: req.body.name
//   }
//   halte.push(halte);
//   console.log("this", haltes);
//   title = "Het is gelukt!";
//   res.render('restaurantlist', {
//     title,
//     haltes
//   });

// })

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


function getData(formOfTransport) {
  console.log("getData function wordt nu uitgevoerd")
  return fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=TRAMMETRO_PUNTEN_2021&THEMA=trammetro') // fetch data from API
    .then(res => res.json()) // Convert data to json
    .then(jsonData => cleanData(jsonData)) // clean the data
    .then(cleanedData => matchData(cleanedData, formOfTransport)) // matches the data from the api with the data from form input
    .catch(err => console.log(err)) // catch errors if the two functions above fail
};

function cleanData(data) {
  // console.log('type van je hele dataset: ' + data.type)
  // console.log('name van je hele dataset: ' + data.name)

  // console.log('id van het eerste object: ' + data.features[0].id)
  // console.log('geometry van het eerste object: ' + data.features[0].geometry)
  // console.log('coordinates van het eerste object: ' + data.features[0].geometry.coordinates) // coordinaten van het object

  // console.log('naam van het eerste object: ' + data.features[0].properties.Naam) // naam van de locatie
  // console.log('modaliteit van het eerste object: ' + data.features[0].properties.Modaliteit) // vorm van transport

  const alleTransports = data.features
  const transportArray = alleTransports.map(function (transportItem) {
    // console.log(transportItem)  // one item of the array is called transportItem. So: transportItem.geometry.coordinates, would give [4.853117, 52.358384]
    const newTransportItem = {
      id: transportItem.id,
      naam: transportItem.properties.Naam,
      modaliteit: transportItem.properties.Modaliteit,
      coordinates: transportItem.geometry.coordinates,
      label: transportItem.properties.Label,
      lijn: transportItem.properties.Lijn
    }
    return newTransportItem
  })

  return transportArray
}

function matchData(data, formOfTransport) {
  // match the location & transport form with the data from the api and return matched results
  console.log('matchData function wordt nu uitgevoerd')
  console.log('We willen dit hebben: ', formOfTransport);
  console.log('# data:',
    data.length);

  return data.filter((item) => item.modaliteit.toLowerCase() === formOfTransport)
};


// function renderResults(element, data) {
//   console.log('renderResults function wordt nu uitgevoerd')
//   document.querySelector(element).innerHTML = data;
//   return data = `
//   <h2>Your best options are: ${transportItem.properties.Naam}</h2>
//  <p>this is a ${transportItem.properties.Modaliteit}</p>`


// };


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
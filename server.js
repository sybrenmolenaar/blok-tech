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

app.post("/likestop", async (req, res) => {
  // haal stopId op uit button value
  const stopId = req.body.id
  //maak like aan in de database
  await db.collection('matches').insertOne({
    id: stopId
  })
  //re-direct naar de homepage
  res.redirect("/")

})

app.post("/dislikestop", async (req, res) => {
  // haal stopId op uit button value
  const stopId = req.body.id
  // verwijder like met stopId meegekregen van button 
  await db.collection('matches').deleteOne({
    id: stopId
  })
  //re-direct naar de homepage
  res.redirect("/")

})
app.get('/', async (req, res) => {
  // RENDER PAGE
  const title = "Find the best nearest stop for you!";

  const type = req.query.type;
  // haal likes op uit de database (genaamd matches). Maak hier array van. 
  const likes = await db.collection('matches').find({}, {}).toArray()

  // like id's worden geconverteerd naar nummers zodat je ze overeenkomen met de id's uit de api. 
  const mappedLikes = likes.map(like => Number(like.id))


  console.log(mappedLikes)
  // Data uit form halen
  // const travelLocation = req.body.location;
  // const formOfTransport = req.body.transportType;
  // console.log('formOfTransport', formOfTransport)
  const result = await getDataHome() // get data from API, and we still have to pass the data to the matchData and eventually renderResults function

  console.log(result.length)

  // res.send(result);
  res.render('index', {
    stops: result,
    title: 'success',
    likes: mappedLikes,

  })





  // return
  // }

  // res.render('index', {
  //   title,
  //   stops: []
  // });


});

app.post("/filter", async (req, res) => {
  console.log("form data", req.body);


  const data = await getData(req.body.type);
  //get the data from the API, wait for the response of the API before you send the content.
  console.log(data);

  res.render('index', { //render the data on the page, show the stops and the title.
    stops: data,
  })
})

app.use(express.static('public'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


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

function getDataHome() {
  return fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=TRAMMETRO_PUNTEN_2021&THEMA=trammetro')
    .then(res => res.json())
    .then(data => cleanData(data))
}

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
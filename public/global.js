//source: https://github.com/w3c/geolocation-api



console.log(haversineDistance);

function getDataHome() {
  return fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=TRAMMETRO_PUNTEN_2021&THEMA=trammetro')
    .then(res => res.json())
    .then(data => cleanData(data))
}

function cleanData(data) {


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


navigator.geolocation.getCurrentPosition(async (position) => {
  const {
    latitude,
    longitude
  } = position.coords;
  const data = await getDataHome();

  data.forEach((item, index) => {
    const locations = document.querySelectorAll(".stops")
    const distance = document.createElement("div")
    const haversine = haversineDistance(position.coords, item.coordinates) / 1000
    const haversineRounded = Math.round(haversine)

    const distanceString = `Distance ${haversineRounded}`

    console.log(distanceString)
    const distanceContent = document.createTextNode(distanceString + " KM") //voeg de boodschap "afstand tot jou" toe.

    distance.appendChild(distanceContent)
    locations[index].appendChild(distance)
  })
  console.log(data)
  // Do something cool with latitude, longitude
  console.log(position.coords)
});

// function matchData(data) {
//   console.log('matchData function wordt nu uitgevoerd')
//   console.log(data)
//   const submitForm = document.querySelector('ptForm'); //get the input data from the form on the page
//   const bus = document.querySelector('bus');

//   ptForm.addEventListener('submit', (e) => {
//     e.preventDefault(); //prevent the browser from going to another page once the form is submitted

//     if (document.querySelector('bus').checked = data.transportItem.properties.Modaliteit("Bus")) {
//       console.log("We hebben een bus!")
//     }
//   });

// match the location & transport form with the data from the api and return matched results
// };
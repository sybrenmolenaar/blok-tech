//source: https://github.com/w3c/geolocation-api
navigator.geolocation.getCurrentPosition(position => {
  const {
    latitude,
    longitude
  } = position.coords;
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


function renderResults(element, data) {
  console.log('renderResults function wordt nu uitgevoerd')
  const ptForm = document.querySelector('ptForm')

  return data.map(data => { // loop through the data
    gallery.innerHTML += // add the following HTML to the gallery element
      document.querySelector(element).innerHTML = data;
    return data = `
  <h2>Your best options are: ${transportItem.properties.Naam}</h2>
 <p>this is a ${transportItem.properties.Modaliteit}</p>`

  });
}
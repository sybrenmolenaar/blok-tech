navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Do something cool with latitude, longitude
    console.log(position.coords)
  });

console.log('test');
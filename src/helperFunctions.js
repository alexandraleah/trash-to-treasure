function promisfyGeolocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

if (navigator && navigator.geolocation) {
  const pos = await getUserPosition();
  const coords = pos.coords;
  const lat = Number(coords.latitude);
  const long = Number(coords.longitude);

  const pos = await getUserPosition();
  const coords = pos.coords;
  const lat = Number(coords.latitude);
  const lng = Number(coords.longitude);
  this.setState({ center: { lat: lat, lng: lng }, treasures });

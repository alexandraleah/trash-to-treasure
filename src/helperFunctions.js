function promisfyGeolocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export let getUserPosition = async function() {
  try {
    if (navigator && navigator.geolocation) {
      const pos = await promisfyGeolocation();
      const coords = pos.coords;
      const lat = Number(coords.latitude);
      const lng = Number(coords.longitude);
      return {
        lat: lat,
        lng: lng,
      };
    } else {
      console.log('no support for geolocation');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

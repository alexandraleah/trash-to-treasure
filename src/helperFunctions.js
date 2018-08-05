import axios from 'axios';

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

export let lookUpAddress = async function(lat, long) {
  const latlng = lat.toString() + ',' + long.toString();
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyCjxnaxhQdSIlkUO_L6KZvYAJTy4Uasnw4
    `
  );
  return response.data.results[0].formatted_address;
};

import axios from 'axios';

//the  geolocation method is written to accept a callback, this function wraps the method and returns a promise
function promisfyGeolocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
//this function finds the users location. If it cannot get location it returns false.
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

//this function uses google's reverse geolocation api to return an address
export let lookUpAddress = async function(lat, long) {
  const latlng = lat.toString() + ',' + long.toString();
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyCjxnaxhQdSIlkUO_L6KZvYAJTy4Uasnw4
    `
  );
  //this api returns many possible human readable versions of the address. We grabe the first one, which for these purposes is enough.
  return response.data.results[0].formatted_address;
};

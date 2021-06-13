import axios from "axios";

const { REACT_APP_APIKEY } = process.env;

const getCountry = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat.toString()},${lng.toString()}&location_type=APPROXIMATE&result_type=country&key=${REACT_APP_APIKEY}`;

  try {
    let res = await axios.get(url);
    return res.data.results[0].address_components[0].short_name;
  } catch (err) {
    return "No Address";
  }
};

const checkClick = async (lat, lng, currLocation) => {
  try {
    let clickCountry = await getCountry(lat, lng);
    if (clickCountry === currLocation[1]) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

export default checkClick;

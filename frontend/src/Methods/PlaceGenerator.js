import countries from "../countries.js";

export default function getCountryList(numCountries) {
  let keys = Object.keys(countries);
  let countryList = []
  let numKeys = keys.length;
  for (let i = 0; i < numCountries; i++) {
    let randNum = Math.floor(Math.random() * numKeys);
    let randCountry = keys[randNum];
    let randCountryAbbr = countries[randCountry];
    countryList.push([randCountry, randCountryAbbr]);
    keys[randNum] = keys[keys.length - 1];
    keys.pop();
    numKeys--;
  };
  return countryList;
};
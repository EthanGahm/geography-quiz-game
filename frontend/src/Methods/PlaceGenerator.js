import countries from "../countries";

export function getRandomCountry() {
  let keys = Object.keys(countries);
  let numCountries = keys.length;
  let randNum = Math.floor(Math.random() * numCountries);
  let randCountry = keys[randNum];
  let randCountryAbbr = countries[randCountry];
  return [randCountry, randCountryAbbr];
};

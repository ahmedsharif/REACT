const url = 'http://api.openweathermap.org/data/2.5/forecast/';
const units = 'metric';
const cnt = 7;
const API_KEY = "672aa588c2a9ed1c903cd291e545dcac";
const city = 'london';

const getWeather = (city, type) => {
  let queryUrl = `${url}/${type}?q=${city}&units=${units}&cnt=${cnt}&APPID=${API_KEY}`;
  return fetch(queryUrl) 
    .then ( response => {
      if ( ! response.ok ) { throw response }
        return response.json();
    })
};

export const weatherCity = (city) => getWeather(city, 'daily')
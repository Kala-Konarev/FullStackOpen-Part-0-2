import axios from "axios";
const iconUrl = (id) => `https://openweathermap.org/img/wn/${id}@2x.png`;
const apiKey = import.meta.env.VITE_WEATHER_KEY;
console.log(apiKey);

const weatherUrl = (capital) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;
const getWeather = (c) => axios.get(weatherUrl(c)).then((r) => r.data);
const getIcon = (id) => axios.get(iconUrl(id)).then((r) => r.data);

export default { getWeather, getIcon };

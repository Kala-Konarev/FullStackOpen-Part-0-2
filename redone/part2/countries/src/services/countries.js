import axios from "axios";
const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const nameUrl = (name) =>
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;
const getAll = () => axios.get(allUrl).then((resp) => resp.data);

const getCountryInfo = (name) =>
    axios.get(nameUrl(name)).then((resp) => resp.data);

export default { getAll, getCountryInfo };
